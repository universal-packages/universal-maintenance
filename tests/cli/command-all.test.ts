import { runWorkflow } from '../../src/runWorkflow'

jest.mock('../../src/runWorkflow')

describe('cli', (): void => {
  it('execs thw right workflow', async (): Promise<void> => {
    process.argv = ['node', 'umaintenance', 'command-all', 'git status']
    await import('../../src/cli')

    expect(runWorkflow).toHaveBeenCalledWith('command-all', { command: 'git status' })
  })
})
