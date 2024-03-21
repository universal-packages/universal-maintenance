import { Status } from '@universal-packages/workflows'

describe('sync-all', (): void => {
  it('runs the right commands', async (): Promise<void> => {
    const workflow = await workflowsJest.run('prepare-development', {
      targetMockResults: [{ command: 'if test -d universal-package-1; then echo true; fi', workingDirectory: './..', result: 'true\n' }],
      workflowsLocation: './src'
    })
    const commandHistory = workflowsJest.getCommandHistory()

    expect(workflow).toHaveFinishWithStatus(Status.Success)
    expect(commandHistory).toEqual([
      { command: 'if test -d universal-package-1; then echo true; fi', workingDirectory: './..' },
      { command: 'git pull', workingDirectory: './../universal-package-1' },
      { command: 'npm i', workingDirectory: './../universal-package-1' },
      { command: 'if test -d universal-package-2; then echo true; fi', workingDirectory: './..' },
      { command: 'git clone git://github.com/universal-packages/universal-package-2.git', workingDirectory: './..' },
      { command: 'npm i', workingDirectory: './../universal-package-2' },
      { command: 'if test -d universal-package-3; then echo true; fi', workingDirectory: './..' },
      { command: 'git clone git://github.com/universal-packages/universal-package-3.git', workingDirectory: './..' },
      { command: 'npm i', workingDirectory: './../universal-package-3' },
      { command: 'if test -d universal-package-4; then echo true; fi', workingDirectory: './..' },
      { command: 'git clone git://github.com/universal-packages/universal-package-4.git', workingDirectory: './..' },
      { command: 'npm i', workingDirectory: './../universal-package-4' }
    ])
  })
})
