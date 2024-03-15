import { runWorkflow } from '../../src/runWorkflow'

jest.mock('../../src/runWorkflow')

describe('cli', (): void => {
  it('execs thw right workflow', async (): Promise<void> => {
    process.argv = ['node', 'umaintenance', 'sync-all', '-f']
    await import('../../src/cli')

    expect(runWorkflow).toHaveBeenCalledWith('sync-all', { force: true })
  })
})
