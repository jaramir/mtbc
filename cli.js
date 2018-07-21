#!/usr/bin/env node

const path = require('path')
const os = require('os')
const minimist = require('minimist')
const ramda = require('ramda')
const mtbc = require('./mtbc')

const argv = minimist(process.argv.slice(2))

const filename = path.join(os.homedir(), '.mtbc.json')
const history = mtbc.load(filename)

if (argv._.length === 0) {
  const names = mtbc.getNames(history)
  names.forEach(name => console.log(name))
} else if (argv._.length === 1) {
  const name = argv._[0]
  const conversation = mtbc.meet(name, new Date())
  mtbc.save(filename, ramda.append(conversation, history))
} else {
  console.log('usage:')
  console.log('mtbc                        print report')
  console.log('mtbc <name>                 record conversation')
}
