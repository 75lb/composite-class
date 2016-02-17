'use strict'
var test = require('tape')
var Composite = require('../')

test('.add()', function(t){
  const root = new Composite()
  root.id = 'root'
  let child = root.add(new Composite())
  child.id = 1
  child = root.add(new Composite())
  child.id = 2
  t.strictEqual(root.id, 'root')
  t.strictEqual(root.children[0].id, 1)
  t.strictEqual(root.children[0].parent, root)
  t.strictEqual(root.children[1].id, 2)
  t.strictEqual(root.children[1].parent, root)
  t.end()
})

test('.root()', function(t){
  const tree = new Composite()
  tree.id = 'root'
  let child = tree.add(new Composite())
  child.id = 1
  child = tree.add(new Composite())
  child.id = 2
  t.strictEqual(child.root().id, 'root')
  t.end()
})
