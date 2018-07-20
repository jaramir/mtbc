import test from 'tape'

import { getNames, meet } from './index'

test('initually we have not met anyone', t => {
  t.deepEqual(getNames([]), [])

  t.end()
})

test('once we meet someone', t => {
  const history = [
    meet('Alice Cooper', new Date())
  ]

  t.deepEqual(getNames(history), ['Alice Cooper'])
  t.end()
})

test('we have met multiple people', t => {
  const history = [
    meet('Alice', new Date()),
    meet('Bob', new Date())
  ]

  t.deepEqual(getNames(history), [ 'Alice', 'Bob' ])
  t.end()
})

test('find each person once', t => {
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
