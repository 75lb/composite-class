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

test.set('subclass mixin', function () {
  class SubClass extends Composite {}
  class Test {}
  SubClass.mixInto(Test)
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

test.set('getAncestors', async function () {
  const root = new Composite()
  const child1 = new Composite()
  const child2 = new Composite()
  root.add(child1)
  child1.add(child2)
  a.deepEqual(Array.from(child2.getAncestors()), [child1, root])
})

test.set('tree()', async function () {
  class TestTree extends Composite {
    treeLabel () {
      return 'something'
    }
  }
  const root = new TestTree()
  const child1 = new TestTree()
  const child2 = new TestTree()
  root.add(child1)
  child1.add(child2)
  // this.data = root.tree()
  a.equal(root.tree(), '- something\n  - something\n    - something\n')
})


test.set('tree(depth)', async function () {
  class TestTree extends Composite {
    treeLabel () {
      return 'something'
    }
  }
  const root = new TestTree()
  const child1 = new TestTree()
  const child2 = new TestTree()
  root.add(child1)
  child1.add(child2)
  const result = root.tree(2)
  a.equal(result, '- something\n  - something\n')
})

test.set('isComposite 1', async function () {
  const root = new Composite()
  a.ok(Composite.isComposite(root))
})

test.set('isComposite 2: subclass', async function () {
  class TestTree extends Composite {}
  const root = new TestTree()
  a.ok(TestTree.isComposite(root))
})

test.set('isComposite 3: mixin', async function () {
  class TestTree {}
  Composite.mixInto(TestTree)
  const root = new TestTree()
  root._initComposite() // required, for now.
  a.ok(Composite.isComposite(root))
})

test.set('toJSON', async function () {
  const root = new Composite()
  const child1 = new Composite()
  const child2 = new Composite()
  root.id = 'root'
  child1.id = 'child1'
  child2.id = 'child2'
  root.add(child1)
  child1.add(child2)
  const result = JSON.stringify(root)
  a.equal(result, '{"children":[{"children":[{"children":[],"id":"child2"}],"id":"child1"}],"id":"root"}')
})

test.set('toJSON on a mixin', async function () {
  class TestTree {}
  Composite.mixInto(TestTree)
  const root = new TestTree()
  const child1 = new TestTree()
  const child2 = new TestTree()
  root._initComposite()
  child1._initComposite()
  child2._initComposite()
  root.id = 'root'
  child1.id = 'child1'
  child2.id = 'child2'
  root.add(child1)
  child1.add(child2)
  const result = JSON.stringify(root)
  a.equal(result, '{"children":[{"children":[{"children":[],"id":"child2"}],"id":"child1"}],"id":"root"}')
})

export { test, only, skip }
