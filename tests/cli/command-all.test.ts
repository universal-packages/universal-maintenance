workflowsJest.mockRuns()

describe('cli', (): void => {
  it('execs the right workflow', async (): Promise<void> => {
    process.argv = ['node', 'umaintenance', 'command-all', 'git status']
    await import('../../src/cli')

    expect('command-all').toHaveBeenBuildAndRunWithVariables({ command: 'git status' })
  })
})
