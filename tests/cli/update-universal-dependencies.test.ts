workflowsJest.mockRuns()

describe('cli', (): void => {
  it('execs the right workflow', async (): Promise<void> => {
    process.argv = ['node', 'umaintenance', 'update-universal-dependencies']
    await import('../../src/cli')

    expect('update-universal-dependencies').toHaveBeenBuildAndRun()
  })
})
