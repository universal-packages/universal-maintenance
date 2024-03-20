import { Status } from '@universal-packages/workflows'

describe('command-all', (): void => {
  it('runs the right commands', async (): Promise<void> => {
    const workflow = await workflowsJest.run('command-all', {
      targetMockResults: [{ command: 'ls', workingDirectory: '../', result: 'universal-1\nuniversal-2\n' }],
      variables: { command: 'git status' }
    })
    const commandHistory = workflowsJest.getCommandHistory()

    expect(workflow).toHaveFinishWithStatus(Status.Success)
    expect(commandHistory).toEqual([
      { command: 'ls', workingDirectory: '../' },
      { command: 'git status', workingDirectory: './../universal-1' },
      { command: 'git status', workingDirectory: './../universal-2' }
    ])
  })
})
