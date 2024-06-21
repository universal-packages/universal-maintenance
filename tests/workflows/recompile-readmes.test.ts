import { Status } from '@universal-packages/workflows'

describe('recompile-readmes', (): void => {
  it('runs the right commands', async (): Promise<void> => {
    const workflow = await workflowsJest.run('recompile-readmes', {
      targetMockResults: [{ command: 'ls', workingDirectory: '../', result: 'universal-1\nuniversal-2\n' }],
      variables: { message: 'Some changes' },
      workflowsLocation: './src'
    })
    const commandHistory = workflowsJest.getCommandHistory()

    expect(workflow).toHaveFinishWithStatus(Status.Success)
    expect(commandHistory).toEqual([
      { command: 'ls', workingDirectory: '../' },
      { command: 'mkdir -p ./tmp/docs' },
      { command: 'cp ./../universal-1/README.md ./tmp/docs/universal-1.md' },
      { command: 'cp ./../universal-2/README.md ./tmp/docs/universal-2.md' }
    ])
  })
})
