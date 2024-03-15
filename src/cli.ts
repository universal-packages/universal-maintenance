import yargs, { ArgumentsCamelCase } from 'yargs'

import { runWorkflow } from './runWorkflow'
import { updateDependents } from './updateDependents'

yargs
  .usage('Usage: $0 <command>')
  .command({
    command: 'update-dependents',
    aliases: 'ud',
    describe: 'Finds all universal packages that depends on the current package and updates them to the latest version',
    handler: (_argv: ArgumentsCamelCase) => {
      updateDependents()
    }
  })

  .command({
    command: 'command-all <command>',
    aliases: 'ca',
    describe: 'Execs a command in all the universal packages in development',
    handler: (argv: ArgumentsCamelCase) => {
      runWorkflow('command-all', { command: argv.command })
    }
  })
  .command({
    command: 'commit-all <message>',
    aliases: 'gca',
    describe: 'Commits all the universal packages in development with the same message',
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
  .demandCommand(1, '')
  .help('h')
  .alias('h', 'help')
  .showHelpOnFail(true)
  .epilog('universal-packages 2023').argv
