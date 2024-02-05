import { BaseUsable } from '@universal-packages/workflows'
import fetch from 'node-fetch'

import { PackageVersionResult, PackagesSearchResult } from '../types'

export default class GetUniversalPackagesListUsable extends BaseUsable {
  public static readonly usableName = 'get-universal-packages-list'

  private stopping = false

  public async use(): Promise<void> {
    this.setOutput(await this.fetchUniversalPackages())
  }

  public async internalStop(): Promise<void> {
    this.stopping = true
  }

  private async fetchUniversalPackages(): Promise<PackageVersionResult[]> {
    const packages = await this.searchPackages('@universal-packages')
    const finalPackages: PackageVersionResult[] = []

    for (let i = 0; i < packages.objects.length; i++) {
      if (this.stopping) break

      finalPackages.push(await this.fetchGitHubPackage(packages.objects[i].package.name))
    }

    return finalPackages
  }

  private async fetchGitHubPackage(packageName: string): Promise<PackageVersionResult> {
    const repoName = packageName.replace('@universal-packages/', 'universal-')
    const response = await fetch(`https://raw.githubusercontent.com/universal-packages/${repoName}/main/package.json`)
    return await response.json()
  }

  private async searchPackages(search: string): Promise<PackagesSearchResult> {
    const response = await fetch(`https://registry.npmjs.org/-/v1/search?text=${search}&size=1000`)
    return await response.json()
  }
}
