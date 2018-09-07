#!/usr/bin/env node

const path = require('path')
const os = require('os')
const ramda = require('ramda')
const mtbc = require('./mtbc')
const inquirer = require('inquirer')

function recordConversation (who) {
  const filename = path.join(os.homedir(), '.mtbc.json')
  const history = mtbc.load(filename)
  const conversation = mtbc.meet(who, new Date())
  mtbc.save(filename, ramda.append(conversation, history))
}

inquirer
  .prompt({
    type: 'input',
    name: 'who',
    message: 'Who have you had a conversation with?'
  })
  .then(answers => {
    if (answers.who) {
      recordConversation(answers.who)
    }
  })
