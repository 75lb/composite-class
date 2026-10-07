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

class Composite {
  /* instance properties, not getters as they are not enumerable */
  children = []
  parent

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
    this._initComposite()
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
    this._initComposite()
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
    this._initComposite()
    this.children.unshift(child)
    return child
  }

  /**
   * @param {Composite} child - the child node to remove
   * @returns {Composite}
   */
  remove (child) {
    this._initComposite()
    return this.children.splice(this.children.indexOf(child), 1)
  }

  /**
   * depth level in the tree, 0 being root.
   * @returns {number}
   */
  level () {
    /* TODO: use the getAncestors() iterator? */
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
    this._initComposite()
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

  * getAncestors () {
    let parent = this.parent
    while (parent) {
      yield parent
      parent = parent.parent
    }
  }

  /* Required because Composite behaviour can be mixed into a target class, instances of which will not have `children` set by default. */
  /* TODO: make this private, or a Symbol, some non-enumerable not visible to the user */
  _initComposite () {
    this.children ||= []
  }

  /**
   * TODO: this method does not work from subclasses. E.g. create `class Contents extends Composite {}` then try Contents.mixInto. Doesn't work, needs to be `Composite.mixInto()`. This is a problem because treeLabel() expects you to subclass.
   *
   * @param {object} - The target class (or constructor function) to receive the state machine behaviour.
   */
  static mixInto (TargetClass) {
    for (const name of ['_initComposite', 'add', 'append', 'prepend', 'remove', 'level', 'getNodeCount', 'tree', 'treeLabel', 'root', Symbol.for('nodejs.util.inspect.custom'), 'getAncestors', Symbol.iterator]) {
      /* TODO: on a subclass, the source method will not be found - it's on the base class. You can fix this by using Composite.mixInto instead of SubClass.mixInto but that fails to copy over the overriden work on SubClass.
      Fix? Reference Composite directly instead of `this`.
       */
      const sourceMethod = Object.getOwnPropertyDescriptor(Composite.prototype, name)
      if (sourceMethod) {
        if (TargetClass.prototype === undefined) {
          throw new Error('can only mixInto a class') // TODO: use typical.isClass?
          // Object.defineProperty(TargetClass, name, sourceMethod)
        } else {
          Object.defineProperty(TargetClass.prototype, name, sourceMethod)
        }
      } else {
        console.error(`[Composite.mixInto] Method not found on class/object "${this.name}": `, name)
      }
    }
    return TargetClass
  }
}

function isComposite (item) {
  return item && item.children && item.add && item.level && item.root
}

export default Composite
