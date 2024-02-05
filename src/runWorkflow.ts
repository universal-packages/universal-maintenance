import { Workflow } from '@universal-packages/workflows'

export async function runWorkflow(name: string): Promise<void> {
  const workflow = Workflow.buildFrom(name)

  workflow.on('failure', () => {
    console.log(JSON.stringify(workflow.graph, null, 2))
  })

  await workflow.run()
}
