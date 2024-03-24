import { readPackageJson } from '@universal-packages/package-json'
import { BaseUsable } from '@universal-packages/workflows'

export default class AfterUniversalDependenciesUpdateUsable extends BaseUsable {
  public static readonly usableName = 'after-universal-dependencies-update'

  public async use(): Promise<void> {
    const packageJson = readPackageJson()
    const universalDependencies = this.scope.variables.universalDependencies
    let shouldCommit = false
    let shouldCreateTag = false

    for (let i = 0; i < universalDependencies.length; i++) {
      const currentDependency = universalDependencies[i]
      const inPackageJson = packageJson[currentDependency.packageLocation][currentDependency.name]
      const isForTagCreation = ['dependencies', 'peerDependencies'].includes(currentDependency.packageLocation)

      if (inPackageJson !== currentDependency.version) {
        shouldCommit = true
        shouldCreateTag ||= isForTagCreation
      }
    }

    this.setOutput({ shouldCommit, shouldCreateTag })
  }
}
