'use strict'
var test = require('tape')
var Composite = require('../')

test('.getRoot()', function(t){
  const tree = new Composite()
  tree.id = 'root'
  let child = tree.add(new Composite())
  child.id = 1
  child = tree.add(new Composite())
  child.id = 2
  t.strictEqual(child.root().id, 'root')
  t.end()
})
