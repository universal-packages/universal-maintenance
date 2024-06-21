import { sleep } from '@universal-packages/time-measurer'

workflowsJest.mockRuns()

describe('cli', (): void => {
  it('recompile-readmes', async (): Promise<void> => {
    process.argv = ['node', 'umaintenance', 'recompile-readmes']
    await import('../../src/cli')

    await sleep(500)

    expect('recompile-readmes').toHaveBeenBuildAndRun()
  })
})
