workflowsJest.mockRuns()

describe('cli', (): void => {
  it('execs thw right workflow', async (): Promise<void> => {
    process.argv = ['node', 'umaintenance', 'command-all', 'git status']
    await import('../../src/cli')

    expect('command-all').toHaveBeenBuildAndRunWithVariables({ command: 'git status' })
  })
})
