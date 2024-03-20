workflowsJest.mockRuns()

describe('cli', (): void => {
  it('update-dependents', async (): Promise<void> => {
    process.argv = ['node', 'umaintenance', 'prepare-development']
    await import('../../src/cli')

    expect('prepare-development').toHaveBeenBuildAndRun()
  })
})
