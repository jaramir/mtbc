#!/usr/bin/env node

const path = require('path')
const os = require('os')
const mtbc = require('./mtbc')
require('colors')

const filename = path.join(os.homedir(), '.mtbc.json')
const history = mtbc.load(filename)

const names = mtbc.getNames(history)
names.forEach(name => {
  console.log(name.bold, '\t', mtbc.whenHaveWeMet(history, name))
})
