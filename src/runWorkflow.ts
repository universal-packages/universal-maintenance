import { TerminalPresenter } from '@universal-packages/terminal-presenter'
import { Workflow } from '@universal-packages/workflows'
import { WorkflowTerminalPresenter } from '@universal-packages/workflows-terminal-presenter'
import path from 'path'

export async function runWorkflow(name: string, variables?: Record<string, any>): Promise<void> {
  TerminalPresenter.start()

  const workflow = Workflow.buildFrom(name, { variables, workflowsLocation: path.resolve(__dirname) })
  const workflowTerminalPresenter = new WorkflowTerminalPresenter({
    showStrategyRoutines: 'running',
    workflow
  })

  process.addListener('SIGINT', () => {
    if (workflow.status === 'stopping') {
      workflow.stop()
    } else {
      process.exit(0)
    }
  })

  workflowTerminalPresenter.present()

  await workflow.run()

  TerminalPresenter.stop()
}
