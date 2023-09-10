import { updateDependents } from '../../src/updateDependents'

jest.mock('../../src/updateDependents')

describe('cli', (): void => {
  it('update-dependents', async (): Promise<void> => {
    process.argv = ['node', 'umaintenance', 'update-dependents']
    await import('../../src/cli')

    expect(updateDependents).toHaveBeenCalled()
  })
})
