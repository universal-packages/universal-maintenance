import { readPackageJson } from '@universal-packages/package-json'
import { exec } from 'child_process'
import fetch from 'node-fetch'

import { Dependents, PackageType, PackageVersionResult, PackagesSearchResult } from './types'

export async function updateDependents(): Promise<void> {
  const packageJson = readPackageJson()
  const packageName = packageJson.name
  const dependents = await findDependents(packageName)
  const errors = []

  await execCommand('mkdir -p ./tmp')

  for (let i = 0; i < dependents.regular.length; i++) {
    const dependent = dependents.regular[i]

    if (dependent.dependencies[packageName] === `^${packageJson.version}`) continue

    try {
      await performPackageUpgrade(packageName, 'regular', dependent, true, i !== dependents.regular.length - 1)
    } catch (error) {
      errors.push(error)
    }
  }

  for (let i = 0; i < dependents.peer.length; i++) {
    const dependent = dependents.peer[i]

    if (dependent.peerDependencies[packageName] === `^${packageJson.version}`) continue

    try {
      await performPackageUpgrade(packageName, 'peer', dependent, true, i !== dependents.peer.length - 1)
    } catch (error) {
      errors.push(error)
    }
  }

  for (let i = 0; i < dependents.optional.length; i++) {
    const dependent = dependents.optional[i]

    if (dependent.optionalDependencies[packageName] === `^${packageJson.version}`) continue

    try {
      await performPackageUpgrade(packageName, 'optional', dependent, false, false)
    } catch (error) {
      errors.push(error)
    }
  }

  for (let i = 0; i < dependents.dev.length; i++) {
    const dependent = dependents.dev[i]

    if (dependent.devDependencies[packageName] === `^${packageJson.version}`) continue

    try {
      await performPackageUpgrade(packageName, 'dev', dependent, false, false)
    } catch (error) {
      errors.push(error)
    }
  }

  await execCommand('rm -rf ./tmp')

  if (errors.length) {
    console.log('Errors:')
    console.error(errors)
    throw new Error('There were errors')
  }
}

async function performPackageUpgrade(packageName: string, type: PackageType, dependent: PackageVersionResult, publish: boolean, wait: boolean): Promise<void> {
  const SAVE_MAP: Record<PackageType, string> = {
    dev: ' --save-dev',
    peer: ' --save-peer',
    optional: ' --save-optional',
    regular: ''
  }

  const repoName = `${dependent.name.replace('@universal-packages/', 'universal-')}`
  const repoUrl = process.env.GITHUB_TOKEN ? `https://oauth2:${process.env.GITHUB_TOKEN}@github.com/universal-packages/${repoName}` : dependent.repository

  await execCommand(`cd ./tmp && git clone ${repoUrl}`)
  await execCommand(`cd ./tmp/${repoName} && npm i`)
  await execCommand(`cd ./tmp/${repoName} && npm i ${packageName}@latest${SAVE_MAP[type]}`)
  await execCommand(`cd ./tmp/${repoName} && git add .`)
  await execCommand(`cd ./tmp/${repoName} && git commit -m "Update ${packageName}"`)
  await execCommand(`cd ./tmp/${repoName} && git push`)

  if (publish) {
    await execCommand(`cd ./tmp/${repoName} && npm run test:full`)
    await execCommand(`cd ./tmp/${repoName} && npm version patch`)
    await execCommand(`cd ./tmp/${repoName} && git push`)
    await execCommand(`cd ./tmp/${repoName} && git push --tags`)
  }

  if (wait) await new Promise((resolve) => setTimeout(resolve, 30000))
}

async function findDependents(packageName: string): Promise<Dependents> {
  const dependents: Dependents = {
    all: [],
    dev: [],
    peer: [],
    optional: [],
    regular: []
  }
  const universalPackages = await fetchUniversalPackages()

  for (let i = 0; i < universalPackages.length; i++) {
    const universalPackage = universalPackages[i]

    if (universalPackage.devDependencies) {
      const devDependencies = Object.keys(universalPackage.devDependencies)
      if (devDependencies.includes(packageName)) dependents.dev.push(universalPackage)
    }

    if (universalPackage.peerDependencies) {
      const peerDependencies = Object.keys(universalPackage.peerDependencies)
      if (peerDependencies.includes(packageName)) dependents.peer.push(universalPackage)
    }

    if (universalPackage.optionalDependencies) {
      const optionalDependencies = Object.keys(universalPackage.optionalDependencies)
      if (optionalDependencies.includes(packageName)) dependents.optional.push(universalPackage)
    }

    if (universalPackage.dependencies) {
      const dependencies = Object.keys(universalPackage.dependencies)
      if (dependencies.includes(packageName)) dependents.regular.push(universalPackage)
    }
  }

  dependents.all.push(...dependents.dev, ...dependents.peer, ...dependents.optional, ...dependents.regular)

  return dependents
}

async function fetchUniversalPackages(): Promise<PackageVersionResult[]> {
  const packages = await fetchPackages('@universal-packages')
  const finalPackages = []

  for (let i = 0; i < packages.objects.length; i++) {
    finalPackages.push(await fetchPackage(packages.objects[i].package.name))
  }

  return finalPackages
}

async function fetchPackages(search: string): Promise<PackagesSearchResult> {
  const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${search}&size=1000`)
  return await response.json()
}

async function fetchPackage(packageName: string): Promise<PackageVersionResult> {
  const repoName = packageName.replace('@universal-packages/', 'universal-')
  const response = await fetch(`https://raw.githubusercontent.com/universal-packages/${repoName}/main/package.json`)
  return await response.json()
}

function execCommand(command: string, env: Record<string, any> = {}): Promise<void> {
  return new Promise((resolve, reject): void => {
    exec(command, { env: { ...process.env, ...env } }, (error: Error, stdout: string, stderr: string): void => {
      if (error) reject(error)
      if (stdout || stderr) console.log(stdout || stderr)
      resolve()
    })
  })
}
