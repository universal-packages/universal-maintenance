#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

require('ts-node').register()

try {
  const compiledCli = fs.existsSync(path.resolve(__dirname, '..', 'cli.js'))

  if (compiledCli) {
    require('../cli')
  } else {
    require('../src/cli')
  }
} catch (error) {
  // There was an actual error in this TS library
  if (process[Symbol.for('ts-node.register.instance')] !== undefined) {
    console.log(error)
  }
}
