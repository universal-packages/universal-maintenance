workflowsJest.mockRuns()

describe('cli', (): void => {
  it('update-dependents', async (): Promise<void> => {
    process.argv = ['node', 'umaintenance', 'commit-all', 'message']
    await import('../../src/cli')

    expect('commit-all').toHaveBeenBuildAndRunWithVariables({ message: 'message' })
  })
})
