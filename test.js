import Composite from 'composite-class'
import { strict as a } from 'node:assert'

const [test, only, skip] = [new Map(), new Map(), new Map()]

test.set('.add()', function () {
  const root = new Composite()
  root.id = 'root'
  let child = root.add(new Composite())
  child.id = 1
  child = root.add(new Composite())
  child.id = 2
  a.equal(root.id, 'root')
  a.equal(root.children[0].id, 1)
  a.equal(root.children[0].parent, root)
  a.equal(root.children[1].id, 2)
  a.equal(root.children[1].parent, root)
})

test.set('.root()', function () {
  const tree = new Composite()
  tree.id = 'root'
  let child = tree.add(new Composite())
  child.id = 1
  child = tree.add(new Composite())
  child.id = 2
  a.equal(child.root().id, 'root')
})

test.set('iteration', function () {
  const root = new Composite()
  const one = new Composite()
  const two = new Composite()
  root.add(one)
  root.add(two)
  a.deepEqual(Array.from(root), [root, one, two])
})

test.set('mixin2', function () {
  class Test {}
  Composite.mixInto(Test)
  const root = new Test()
  const one = new Composite()
  const two = new Composite()
  root.add(one)
  root.add(two)
  a.deepEqual(Array.from(root), [root, one, two])
})

test.set('mixin', function () {
  class Test {}
  Composite.mixInto(Test)
  const root = new Test()
  root.id = 'root'
  let child = root.add(new Composite())
  child.id = 1
  child = root.add(new Composite())
  child.id = 2
  a.equal(root.id, 'root')
  a.equal(root.children[0].id, 1)
  a.equal(root.children[0].parent, root)
  a.equal(root.children[1].id, 2)
  a.equal(root.children[1].parent, root)

})

export { test, only, skip }
