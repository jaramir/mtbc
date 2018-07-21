#!/usr/bin/env node

const path = require('path')
const os = require('os')
const ramda = require('ramda')
const mtbc = require('./mtbc')
require('colors')

const argv = process.argv.slice(2)

const filename = path.join(os.homedir(), '.mtbc.json')
const history = mtbc.load(filename)

if (argv.length === 0) {
  const names = mtbc.getNames(history)
  names.forEach(name => {
    console.log(name.bold, '\t', mtbc.whenHaveWeMet(history, name))
  })
} else if (argv.length === 1) {
  const name = argv[0]
  const conversation = mtbc.meet(name, new Date())
  mtbc.save(filename, ramda.append(conversation, history))
} else {
  console.log('usage:')
  console.log('mtbc                        print report')
  console.log('mtbc <name>                 record conversation')
}
