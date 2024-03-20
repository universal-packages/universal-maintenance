import { Status } from '@universal-packages/workflows'

describe('sync-all', (): void => {
  it('runs the right commands', async (): Promise<void> => {
    const workflow = await workflowsJest.run('sync-all', {
      targetMockResults: [{ command: 'ls', workingDirectory: '../', result: 'universal-1\nuniversal-2\n' }],
      variables: { force: true }
    })
    const commandHistory = workflowsJest.getCommandHistory()

    expect(workflow).toHaveFinishWithStatus(Status.Success)
    expect(commandHistory).toEqual([
      { command: 'ls', workingDirectory: '../' },
      { command: 'git reset --hard origin/main', workingDirectory: './../universal-1' },
      { command: 'git pull', workingDirectory: './../universal-1' },
      { command: 'npm i', workingDirectory: './../universal-1' },
      { command: 'git reset --hard origin/main', workingDirectory: './../universal-2' },
      { command: 'git pull', workingDirectory: './../universal-2' },
      { command: 'npm i', workingDirectory: './../universal-2' }
    ])
  })
})
