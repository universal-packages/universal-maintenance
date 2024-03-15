import { BaseUsable } from '@universal-packages/workflows'

export default class GatherLocalUniversalPackagesListUsable extends BaseUsable {
  public static readonly usableName = 'gather-local-universal-packages-list'

  public async use(): Promise<void> {
    this.setOutput(await this.gatherList())
  }

  private async gatherList(): Promise<any[]> {
    const lsResult = await this.runSubProcess('ls', { workingDirectory: '../' })
    const universalPackagesInLocal = lsResult.split('\n').filter((packageName) => packageName.startsWith('universal-'))

    return universalPackagesInLocal.map((packageName) => ({ name: packageName }))
  }
}
