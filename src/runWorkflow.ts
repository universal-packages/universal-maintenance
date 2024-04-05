import { Logger } from '@universal-packages/logger'
import { TerminalPresenterTransport } from '@universal-packages/logger-terminal-presenter'
import { present, restore } from '@universal-packages/terminal-presenter'
import { Status, Workflow } from '@universal-packages/workflows'
import { WorkflowTerminalPresenter } from '@universal-packages/workflows-terminal-presenter'

export async function runWorkflow(name: string, variables?: Record<string, any>): Promise<void> {
  const logger = new Logger({ includeTransportAdapters: { 'terminal-presenter': TerminalPresenterTransport }, transports: ['terminal-presenter'] })
  await logger.prepare()

  present()

  const workflow = Workflow.buildFrom(name, { variables, workflowsLocation: __dirname, stepUsableLocation: __dirname })
  const workflowTerminalPresenter = new WorkflowTerminalPresenter({ logger, showStrategyRoutines: 'running', workflow })

  process.addListener('SIGINT', () => {
    if (workflow.status === 'stopping') {
      workflow.stop()
    } else {
      process.exit(0)
    }
  })

  workflowTerminalPresenter.present()

  await workflow.run()

  await restore()

  if ([Status.Error, Status.Failure].includes(workflow.status)) {
    process.exit(1)
  }
}
