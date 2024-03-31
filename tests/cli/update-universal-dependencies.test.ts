import { sleep } from '@universal-packages/time-measurer'

workflowsJest.mockRuns()

describe('cli', (): void => {
  it('execs the right workflow', async (): Promise<void> => {
    process.argv = ['node', 'umaintenance', 'update-universal-dependencies']
    await import('../../src/cli')

    await sleep(500)

    expect('update-universal-dependencies').toHaveBeenBuildAndRun()
  })
})
