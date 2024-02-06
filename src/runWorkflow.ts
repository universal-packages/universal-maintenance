import { TerminalPresenter, Workflow } from '@universal-packages/workflows'

export async function runWorkflow(name: string): Promise<void> {
  const workflow = Workflow.buildFrom(name)
  const terminalPresenter = new TerminalPresenter(workflow)

  terminalPresenter.present()

  await workflow.run()
}
