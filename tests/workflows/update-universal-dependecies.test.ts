import { Status } from '@universal-packages/workflows'

let jsonPetitions = 0

jest.mock('@universal-packages/package-json', () => ({
  readPackageJson: () => {
    jsonPetitions++
    return {
      dependencies: {
        '@universal-packages/package-1': `${jsonPetitions}`,
        '@universal-packages/package-2': `${jsonPetitions}`
      },
      devDependencies: {
        '@universal-packages/package-3': `${jsonPetitions}`
      }
    }
  }
}))

describe('update-universal-dependencies', (): void => {
  it('runs the right commands', async (): Promise<void> => {
    const workflow = await workflowsJest.run('update-universal-dependencies', { workflowsLocation: './src' })
    const commandHistory = workflowsJest.getCommandHistory()

    expect(workflow).toHaveFinishWithStatus(Status.Success)
    expect(commandHistory).toEqual([
      { command: 'npm update @universal-packages/package-1 --save' },
      { command: 'npm update @universal-packages/package-2 --save' },
      { command: 'npm update @universal-packages/package-3 --save' },
      { command: 'npm run test:full' },
      { command: 'git add package.json package-lock.json' },
      { command: 'git commit -m "Bump @universal-packages dependencies"' },
      { command: 'git push' },
      { command: 'npm version patch' },
      { command: 'git push' },
      { command: 'git push --tags' }
    ])
  })
})
