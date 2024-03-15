import { BaseUsable } from '@universal-packages/workflows'

export default class ConsoleLogUsable extends BaseUsable {
  public static readonly usableName = 'console-log'

  public async use(): Promise<void> {
    this.log()
  }

  private log(): void {
    console.log(this.with)
  }
}
