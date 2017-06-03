'use strict'
const Composite = require('./')
const TestRunner = require('test-runner')
const a = require('assert')

const runner = new TestRunner()

runner.test('.add()', function(t){
  const root = new Composite()
  root.id = 'root'
  let child = root.add(new Composite())
  child.id = 1
  child = root.add(new Composite())
  child.id = 2
  a.strictEqual(root.id, 'root')
  a.strictEqual(root.children[0].id, 1)
  a.strictEqual(root.children[0].parent, root)
  a.strictEqual(root.children[1].id, 2)
  a.strictEqual(root.children[1].parent, root)
})

runner.test('.root()', function(t){
  const tree = new Composite()
  tree.id = 'root'
  let child = tree.add(new Composite())
  child.id = 1
  child = tree.add(new Composite())
  child.id = 2
  a.strictEqual(child.root().id, 'root')
})
