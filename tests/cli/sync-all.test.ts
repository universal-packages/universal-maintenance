workflowsJest.mockRuns()

describe('cli', (): void => {
  it('execs thw right workflow', async (): Promise<void> => {
    process.argv = ['node', 'umaintenance', 'sync-all', '-f']
    await import('../../src/cli')

    expect('sync-all').toHaveBeenBuildAndRunWithVariables({ force: true })
  })
})
