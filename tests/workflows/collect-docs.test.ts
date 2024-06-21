import { Status } from '@universal-packages/workflows'

describe('collect-docs', (): void => {
  it('runs the right commands', async (): Promise<void> => {
    const workflow = await workflowsJest.run('collect-docs', {
      targetMockResults: [{ command: 'ls', workingDirectory: '../', result: 'universal-1\nuniversal-2\n' }],
      variables: { message: 'Some changes' },
      workflowsLocation: './src'
    })
    const commandHistory = workflowsJest.getCommandHistory()

    expect(workflow).toHaveFinishWithStatus(Status.Success)
    expect(commandHistory).toEqual([
      { command: 'ls', workingDirectory: '../' },
      { command: 'mkdir -p ./tmp/docs' },
      { command: "echo '---\nslug: /packages/universal-1\ntitle: universal-1\nnavigationId: universal-1\n---' > ./tmp/docs/universal-1.md" },
      { command: 'cat ./../universal-1/README.md >> ./tmp/docs/universal-1.md' },
      { command: "echo '---\nslug: /packages/universal-2\ntitle: universal-2\nnavigationId: universal-2\n---' > ./tmp/docs/universal-2.md" },
      { command: 'cat ./../universal-2/README.md >> ./tmp/docs/universal-2.md' }
    ])
  })
})
