const { prop, uniq, pipe, map, reverse } = require('ramda')
const { readFileSync, writeFileSync } = require('fs')

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
  writeFileSync(filename, JSON.stringify(data))
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

module.exports = {
  getNames,
  meet,
  save,
  load
}
