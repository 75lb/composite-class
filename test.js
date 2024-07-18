import Composite from 'composite-class'
import TestRunner from 'test-runner'
import { strict as a } from 'assert'

const tom = new TestRunner.Tom()

tom.test('.add()', function () {
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

tom.test('.root()', function () {
  const tree = new Composite()
  tree.id = 'root'
  let child = tree.add(new Composite())
  child.id = 1
  child = tree.add(new Composite())
  child.id = 2
  a.equal(child.root().id, 'root')
})

tom.test('iteration', function () {
  const root = new Composite()
  const one = new Composite()
  const two = new Composite()
  root.add(one)
  root.add(two)
  a.deepEqual(Array.from(root), [root, one, two])
})

tom.test('mixin2', function () {
  class Test {}
  Composite.mixInto(Test)
  const root = new Test()
  const one = new Composite()
  const two = new Composite()
  root.add(one)
  root.add(two)
  a.deepEqual(Array.from(root), [root, one, two])
})

tom.test('mixin', function () {
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

export default tom
