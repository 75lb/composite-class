const Composite = require('./')
const Tom = require('test-runner').Tom
const a = require('assert')

const tom = module.exports = new Tom()

tom.test('.add()', function (t) {
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

tom.test('.root()', function (t) {
  const tree = new Composite()
  tree.id = 'root'
  let child = tree.add(new Composite())
  child.id = 1
  child = tree.add(new Composite())
  child.id = 2
  a.strictEqual(child.root().id, 'root')
})
