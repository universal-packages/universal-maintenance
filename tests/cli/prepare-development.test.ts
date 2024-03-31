import { sleep } from '@universal-packages/time-measurer'

workflowsJest.mockRuns()

describe('cli', (): void => {
  it('update-dependents', async (): Promise<void> => {
    process.argv = ['node', 'umaintenance', 'prepare-development']
    await import('../../src/cli')

    await sleep(500)

    expect('prepare-development').toHaveBeenBuildAndRun()
  })
})
