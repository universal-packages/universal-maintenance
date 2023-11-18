import { prepareDevelopment } from '../../src/prepareDevelopment'

jest.mock('../../src/prepareDevelopment')

describe('cli', (): void => {
  it('update-dependents', async (): Promise<void> => {
    process.argv = ['node', 'umaintenance', 'prepare-development']
    await import('../../src/cli')

    expect(prepareDevelopment).toHaveBeenCalled()
  })
})
