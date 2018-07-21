const test = require('tape')
const { unlinkSync } = require('fs')
const { getNames, meet, save, load, whenHaveWeMet } = require('./mtbc')
const { subDays, subHours } = require('date-fns')

test('initially we have not met anyone', t => {
  t.deepEqual(getNames([]), [])
  t.end()
})

test('find each person we met once', t => {
  const history = [
    meet('Alice', new Date()),
    meet('Bob', new Date()),
    meet('Alice', new Date()),
    meet('Bob', new Date())
  ]

  t.deepEqual(getNames(history), [ 'Alice', 'Bob' ])
  t.end()
})

test('people you met longer ago are first', t => {
  const history = [
    meet('Alice', new Date()),
    meet('Bob', new Date()),
    meet('Carl', new Date()),
    meet('Bob', new Date()),
    meet('Alice', new Date())
  ]

  t.deepEqual(getNames(history), [ 'Carl', 'Bob', 'Alice' ])
  t.end()
})

test('save and load history to file', t => {
  const filename = 'history.test'
  const saved = [
    meet('Alice', new Date()),
    meet('Bob', new Date()),
    meet('Carl', new Date()),
    meet('Bob', new Date()),
    meet('Alice', new Date())
  ]

  save(filename, saved)
  const loaded = load(filename)

  t.deepEqual(loaded, saved)

  unlinkSync(filename)
  t.end()
})

test('empty history if file is missing', t => {
  const filename = 'history.test'

  t.deepEqual(load(filename), [])
  t.end()
})

test('tells how long since we last met someone', t => {
  const history = [
    meet('Alice', subDays(new Date(), 365)),
    meet('Bob', subDays(new Date(), 36)),
    meet('Alice', subDays(new Date(), 3)),
    meet('Bob', subHours(new Date(), 12)),
    meet('Carl', new Date())
  ]

  t.equal(whenHaveWeMet(history, 'Alice'), '3 days ago')
  t.equal(whenHaveWeMet(history, 'Bob'), 'about 12 hours ago')
  t.equal(whenHaveWeMet(history, 'Carl'), 'less than a minute ago')
  t.end()
})
