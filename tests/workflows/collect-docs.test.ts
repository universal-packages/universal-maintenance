import { Status } from '@universal-packages/workflows'

describe('collect-docs', (): void => {
  it('runs the right commands', async (): Promise<void> => {
    const workflow = await workflowsJest.run('collect-docs', {
      workflowsLocation: './src'
    })
    const commandHistory = workflowsJest.getCommandHistory()

    expect(workflow).toHaveFinishWithStatus(Status.Success)
    expect(commandHistory).toEqual([
      { command: 'mkdir -p ./tmp/docs' },
      { command: 'curl -s https://raw.githubusercontent.com/universal-packages/universal-package-1/main/README.md > ./tmp/docs/universal-package-1.md' },
      { command: 'curl -s https://raw.githubusercontent.com/universal-packages/universal-package-2/main/README.md > ./tmp/docs/universal-package-2.md' },
      { command: 'curl -s https://raw.githubusercontent.com/universal-packages/universal-package-3/main/README.md > ./tmp/docs/universal-package-3.md' },
      { command: 'curl -s https://raw.githubusercontent.com/universal-packages/universal-package-4/main/README.md > ./tmp/docs/universal-package-4.md' }
    ])
  })
})
