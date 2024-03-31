import { sleep } from '@universal-packages/time-measurer'

workflowsJest.mockRuns()

describe('cli', (): void => {
  it('update-dependents', async (): Promise<void> => {
    process.argv = ['node', 'umaintenance', 'commit-all', 'message']
    await import('../../src/cli')

    await sleep(500)

    expect('commit-all').toHaveBeenBuildAndRunWithVariables({ message: 'message' })
  })
})
