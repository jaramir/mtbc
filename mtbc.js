const { prop, uniq, pipe, map, reverse, find, propEq } = require('ramda')
const { readFileSync, writeFileSync } = require('fs')
const readFile = require('fs').promises.readFile
const { distanceInWordsToNow } = require('date-fns')

const getNames = pipe(
  reverse,
  map(prop('name')),
  uniq,
  reverse
)

function meet (name, date) {
  return {
    name,
    date: date.toISOString()
  }
}

function save (filename, data) {
  writeFileSync(filename, JSON.stringify(data, null, 2))
}

function load (filename) {
  try {
    return JSON.parse(readFileSync(filename))
  } catch (e) {
    if (e.code === 'ENOENT') {
      return []
    }

    throw e
  }
}

function asyncLoad (filename) {
  return readFile(filename)
    .then(JSON.parse)
    .catch(() => [])
}

function lastConversation (history, name) {
  return pipe(
    reverse,
    find(propEq('name', name)),
    prop('date')
  )(history)
}

function whenHaveWeMet (history, name) {
  return distanceInWordsToNow(lastConversation(history, name)) + ' ago'
}

module.exports = {
  getNames,
  meet,
  save,
  load,
  asyncLoad,
  whenHaveWeMet
}
