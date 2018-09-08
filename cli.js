#!/usr/bin/env node --no-warnings

const path = require('path')
const os = require('os')
const ramda = require('ramda')
const mtbc = require('./mtbc')
const inquirer = require('inquirer')
const autocompletePrompt = require('inquirer-autocomplete-prompt')
const fuzzy = require('fuzzy')
const filename = path.join(os.homedir(), '.mtbc.json')

inquirer.registerPrompt('autocomplete', autocompletePrompt)

const source = (answersSoFar, input) =>
  mtbc.asyncLoad(filename)
    .then(mtbc.getNames)
    .then(names => {
      if (!input) return names

      const matches = fuzzy
        .filter(input, names)
        .map(ramda.prop('string'))

      return ramda.append(input, matches)
    })

inquirer
  .prompt({
    type: 'autocomplete',
    name: 'who',
    message: 'Who have you had a conversation with?',
    source
  })
  .then(answers => {
    if (answers.who) {
      const history = mtbc.load(filename)
      const conversation = mtbc.meet(answers.who, new Date())
      mtbc.save(filename, ramda.append(conversation, history))
    }
  })
