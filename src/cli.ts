import yargs, { ArgumentsCamelCase } from 'yargs'

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
  .demandCommand(1, '')
  .help('h')
  .alias('h', 'help')
  .showHelpOnFail(true)
  .epilog('universal-packages 2023').argv
