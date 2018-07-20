import { prop, uniq, pipe, map, reverse } from 'ramda'

export const getNames = pipe(
  reverse,
  map(prop('name')),
  uniq,
  reverse
)

export function meet (name, date) {
  return {name, date}
}
