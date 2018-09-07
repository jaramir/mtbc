#!/usr/bin/env node

const path = require('path')
const os = require('os')
const ramda = require('ramda')
const mtbc = require('./mtbc')

const filename = path.join(os.homedir(), '.mtbc.json')
const history = mtbc.load(filename)
const names = mtbc.getNames(history)

const name = argv[0]
const conversation = mtbc.meet(name, new Date())
mtbc.save(filename, ramda.append(conversation, history))
