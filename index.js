/*☭
## composite-class

An isomorphic, load-anywhere JavaScript class for building [composite structures](https://en.wikipedia.org/wiki/Composite_pattern). Suitable for use as a super class or mixin.

- **Type:** `package`
- **Module type:** Javascript
- **Supported runtimes:** Node.Js version >= 12.20

#### Example

```js
import Composite from 'composite-class'
const composite = new Composite()
```
࿕
id: Something
*/
const _children = new WeakMap()
const _parent = new WeakMap()

class Composite {
  /*☭
  ### composite.children

  Immediate children. This needs to be a getter (not an instance property) for compatibility with .mixInto(). If Composite has been mixed into a new class and the `children` property does yet exist it will be initialised with an empty array.

  - **Type:** `object[]`
  */
  get children () {
    if (_children.has(this)) {
      return _children.get(this)
    } else {
      _children.set(this, [])
      return _children.get(this)
    }
  }

  set children (val) {
    _children.set(this, val)
  }

  /*☭
  ### composite.parent

  Parent.

  - **Type:** `Composite`
  */
  get parent () {
    return _parent.get(this)
  }

  set parent (val) {
    _parent.set(this, val)
  }

  /*☭
  ### composite.add (child)

  Add a child.

  - **Returns:** `Composite`

  ¬
    Param
    Type
    Description
  ¬
    child
    `Composite`
    The child node to add
  ¬
  */
  add (child) {
    if (!(isComposite(child))) throw new Error('can only add a Composite instance')
    child.parent = this
    this.children.push(child)
    return child
  }

  /**
   * @param {Composite} child - the child node to append
   * @returns {Composite}
   */
  append (child) {
    if (!(child instanceof Composite)) throw new Error('can only add a Composite instance')
    child.parent = this
    this.children.push(child)
    return child
  }

  /**
   * @param {Composite} child - the child node to prepend
   * @returns {Composite}
   */
  prepend (child) {
    if (!(child instanceof Composite)) throw new Error('can only add a Composite instance')
    child.parent = this
    this.children.unshift(child)
    return child
  }

  /**
   * @param {Composite} child - the child node to remove
   * @returns {Composite}
   */
  remove (child) {
    return this.children.splice(this.children.indexOf(child), 1)
  }

  /**
   * depth level in the tree, 0 being root.
   * @returns {number}
   */
  level () {
    let count = 0
    function countParent (composite) {
      if (composite.parent) {
        count++
        countParent(composite.parent)
      }
    }
    countParent(this)
    return count
  }

  /**
   * The number of nodes in the tree including the parent.
   *
   * @returns {number}
   */
  getNodeCount () {
    return Array.from(this).length
  }

  /**
   * prints a tree using the .treeLabel() defined by each node in the tree.
   * @returns {string}
   */
  tree () {
    return Array.from(this).reduce((prev, curr) => {
      return (prev += `${'  '.repeat(curr.level())}- ${curr.treeLabel()}\n`)
    }, '')
  }

  treeLabel () {
    throw new Error('Please subclass Composite and add a .treeLabel() method.')
  }

  /**
   * Returns the root instance of this tree.
   * @returns {Composite}
   */
  root () {
    function getRoot (composite) {
      return composite.parent ? getRoot(composite.parent) : composite
    }
    return getRoot(this)
  }

  /**
   * default iteration strategy
   */
  * [Symbol.iterator] () {
    yield this
    for (const child of this.children) {
      yield * child
    }
  }

  /**
   * Used by node's `util.inspect`.
   */
  [Symbol.for('nodejs.util.inspect.custom')] (depth) {
    const clone = Object.assign({}, this)
    delete clone.parent
    return clone
  }

  /**
   * Returns an array of ancestors
   * @return {Composite[]}
   */
  parents () {
    const output = []
    function addParent (node) {
      if (node.parent) {
        output.push(node.parent)
        addParent(node.parent)
      }
    }
    addParent(this)
    return output
  }

  /**
   * TODO: this method does not work from subclasses. E.g. create `class Contents extends Composite {}` then try Contents.mixInto. Doesn't work, needs to be `Composite.mixInto()`. This is a problem because treeLabel() expects you to subclass.
   *
   * @param {object} - The target class (or constructor function) to receive the state machine behaviour.
   */
  static mixInto (target) {
    for (const methodName of ['children', 'parent', 'add', 'append', 'prepend', 'remove', 'level', 'getNodeCount', 'tree', 'treeLabel', 'root', Symbol.for('nodejs.util.inspect.custom'), 'parents', Symbol.iterator]) {
      /* TODO: on a subclass, the source method will not be found - it's on the base class. You can fix this by using Composite.mixInto instead of SubClass.mixInto but that fails to copy over the overriden work on SubClass. */
      const sourceMethod = Object.getOwnPropertyDescriptor(this.prototype, methodName)
      if (sourceMethod) {
        if (target.prototype === undefined) {
          Object.defineProperty(target, methodName, sourceMethod)
        } else {
          Object.defineProperty(target.prototype, methodName, sourceMethod)
        }
      } else {
        console.error(`[Composite.mixInto] Method not found on class/object "${this.name}": `, methodName)
      }
    }
    return target
  }
}

function isComposite (item) {
  return item && item.children && item.add && item.level && item.root
}

export default Composite
