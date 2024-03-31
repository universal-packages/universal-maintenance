import { sleep } from '@universal-packages/time-measurer'

workflowsJest.mockRuns()

describe('cli', (): void => {
  it('execs the right workflow', async (): Promise<void> => {
    process.argv = ['node', 'umaintenance', 'sync-all', '-f']
    await import('../../src/cli')

    await sleep(500)

    expect('sync-all').toHaveBeenBuildAndRunWithVariables({ force: true })
  })
})
