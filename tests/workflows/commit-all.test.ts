import { Status } from '@universal-packages/workflows'

describe('commit-all', (): void => {
  it('runs the right commands', async (): Promise<void> => {
    const workflow = await workflowsJest.run('commit-all', {
      targetMockResults: [{ command: 'ls', workingDirectory: '../', result: 'universal-1\nuniversal-2\n' }],
      variables: { message: 'Some changes' },
      workflowsLocation: './src'
    })
    const commandHistory = workflowsJest.getCommandHistory()

    expect(workflow).toHaveFinishWithStatus(Status.Success)
    expect(commandHistory).toEqual([
      { command: 'ls', workingDirectory: '../' },
      { command: 'git status', workingDirectory: './../universal-1' },
      { command: 'git add .', workingDirectory: './../universal-1' },
      { command: "git commit -m 'Some changes'", workingDirectory: './../universal-1' },
      { command: 'git push', workingDirectory: './../universal-1' },
      { command: 'git status', workingDirectory: './../universal-2' },
      { command: 'git add .', workingDirectory: './../universal-2' },
      { command: "git commit -m 'Some changes'", workingDirectory: './../universal-2' },
      { command: 'git push', workingDirectory: './../universal-2' }
    ])
  })
})
