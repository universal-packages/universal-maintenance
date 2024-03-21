import { Status } from '@universal-packages/workflows'

describe('update-universal-dependencies', (): void => {
  it('runs the right commands', async (): Promise<void> => {
    const workflow = await workflowsJest.run('update-universal-dependencies', { workflowsLocation: './src' })
    const commandHistory = workflowsJest.getCommandHistory()

    expect(workflow).toHaveFinishWithStatus(Status.Success)
    expect(commandHistory).toEqual([
      { command: 'npm update @universal-packages/directory-traversal --save' },
      { command: 'npm update @universal-packages/package-json --save' },
      { command: 'npm update @universal-packages/workflows --save' },
      { command: 'npm update @universal-packages/workflows-terminal-presenter --save' },
      { command: 'npm update @universal-packages/workflows-jest --save-dev' }
    ])
  })
})
