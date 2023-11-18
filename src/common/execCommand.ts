import { exec } from 'child_process'

interface ExecCommandOptions {
  continueOnError?: boolean
  env?: Record<string, any>
}

export function execCommand(command: string, options: ExecCommandOptions = {}): Promise<void> {
  return new Promise((resolve, reject): void => {
    exec(command, { env: { ...process.env, ...options.env } }, (error: Error, stdout: string, stderr: string): void => {
      if (error && !options.continueOnError) reject(error)
      if (stdout || stderr) console.log(stdout || stderr)
      resolve()
    })
  })
}
