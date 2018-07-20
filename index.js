import { prop, uniq, pipe, map, reverse } from 'ramda'
import { readFileSync, writeFileSync } from 'fs'

export const getNames = pipe(
  reverse,
  map(prop('name')),
  uniq,
  reverse
)

export function meet (name, date) {
  return {
    name,
    date: date.toISOString()
  }
}

export function save (filename, data) {
  writeFileSync(filename, JSON.stringify(data))
}

export function load (filename) {
  return JSON.parse(readFileSync(filename))
}
