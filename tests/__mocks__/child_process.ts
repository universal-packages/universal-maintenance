export const exec = jest.fn().mockImplementation(execImplementation)

function execImplementation(_command: string, env: any, callback: (error: Error, stdout: string, stderr: string) => void): void {
  callback(null, '', '')
}
