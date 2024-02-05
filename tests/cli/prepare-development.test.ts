import { runWorkflow } from '../../src/runWorkflow'

jest.mock('../../src/runWorkflow')

describe('cli', (): void => {
  it('update-dependents', async (): Promise<void> => {
    process.argv = ['node', 'umaintenance', 'prepare-development']
    await import('../../src/cli')

    expect(runWorkflow).toHaveBeenCalledWith('prepare-development')
  })
})
