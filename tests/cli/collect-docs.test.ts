import { sleep } from '@universal-packages/time-measurer'

workflowsJest.mockRuns()

describe('cli', (): void => {
  it('collect-docs', async (): Promise<void> => {
    process.argv = ['node', 'umaintenance', 'collect-docs']
    await import('../../src/cli')

    await sleep(500)

    expect('collect-docs').toHaveBeenBuildAndRun()
  })
})
