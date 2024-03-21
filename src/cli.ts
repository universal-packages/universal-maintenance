import yargs, { ArgumentsCamelCase, Argv } from 'yargs'

import { runWorkflow } from './runWorkflow'

yargs
  .usage('Usage: $0 <command>')
  .command({
    command: 'command-all <command>',
    aliases: 'co-a',
    describe: 'Execs a command in all the universal packages in development',
    builder: (yargs: Argv) => yargs.positional('command', { description: 'Command to exec in all repos', type: 'string', demandOption: true }),
    handler: (argv: ArgumentsCamelCase) => {
      runWorkflow('command-all', { command: argv.command })
    }
  })
  .command({
    command: 'commit-all <message>',
    aliases: 'gc-a',
    describe: 'Commits all the universal packages in development with the same message',
    builder: (yargs: Argv) => yargs.positional('message', { description: 'Commit message', type: 'string', demandOption: true }),
    handler: (argv: ArgumentsCamelCase) => {
      runWorkflow('commit-all', { message: argv.message })
    }
  })
  .command({
    command: 'prepare-development',
    aliases: 'pd',
    describe: 'Gets all the universal packages in development and clone them into the outer directory from where this was called',
    handler: (_argv: ArgumentsCamelCase) => {
      runWorkflow('prepare-development')
    }
  })
  .command({
    command: 'sync-all',
    aliases: 'sy-a',
    describe: 'Syncs all the universal packages in development with the latest version in the repos',
    builder: (yargs: Argv) => yargs.options('force', { alias: ['f'], description: 'Reset with main discarding any deviations', type: 'boolean', default: false }),
    handler: (argv: ArgumentsCamelCase) => {
      runWorkflow('sync-all', { force: argv.force })
    }
  })
  .command({
    command: 'update-universal-dependencies',
    aliases: 'uud',
    describe: 'Updates all universal packages dependencies to the latest version',
    handler: (_argv: ArgumentsCamelCase) => {
      runWorkflow('update-universal-dependencies')
    }
  })
  .demandCommand(1, '')
  .help('h')
  .alias('h', 'help')
  .showHelpOnFail(true)
  .epilog('universal-packages 2023').argv
