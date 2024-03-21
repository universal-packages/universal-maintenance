import { readPackageJson } from '@universal-packages/package-json'
import { BaseUsable } from '@universal-packages/workflows'

export default class GatherUniversalDependenciesUsable extends BaseUsable {
  public static readonly usableName = 'gather-universal-dependencies'

  public async use(): Promise<void> {
    const packageJson = readPackageJson()
    const toUpdate = []

    if (packageJson.dependencies) {
      for (const dependency in packageJson.dependencies) {
        if (dependency.includes('@universal-packages')) toUpdate.push({ name: dependency, save: '--save', createTag: true })
      }
    }

    if (packageJson.devDependencies) {
      for (const dependency in packageJson.devDependencies) {
        if (dependency.includes('@universal-packages')) toUpdate.push({ name: dependency, save: '--save-dev', createTag: false  })
      }
    }

    if (packageJson.peerDependencies) {
      for (const dependency in packageJson.peerDependencies) {
        if (dependency.includes('@universal-packages')) toUpdate.push({ name: dependency, save: '--save-peer', createTag: true  })
      }
    }

    if (packageJson.optionalDependencies) {
      for (const dependency in packageJson.optionalDependencies) {
        if (dependency.includes('@universal-packages')) toUpdate.push({ name: dependency, save: '--save-optional', createTag: false  })
      }
    }

    this.setOutput(toUpdate)
  }
}