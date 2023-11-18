import fetch from 'node-fetch'

import { PackageVersionResult, PackagesSearchResult } from '../types'

export async function fetchUniversalPackages(): Promise<PackageVersionResult[]> {
  const packages = await searchPackages('@universal-packages')
  const finalPackages = []

  for (let i = 0; i < packages.objects.length; i++) {
    finalPackages.push(await fetchGitHubPackage(packages.objects[i].package.name))
  }

  return finalPackages
}

async function fetchGitHubPackage(packageName: string): Promise<PackageVersionResult> {
  const repoName = packageName.replace('@universal-packages/', 'universal-')
  const response = await fetch(`https://raw.githubusercontent.com/universal-packages/${repoName}/main/package.json`)
  return await response.json()
}

async function searchPackages(search: string): Promise<PackagesSearchResult> {
  const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${search}&size=1000`)
  return await response.json()
}
