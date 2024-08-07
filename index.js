/**
 * An isomorphic, load-anywhere JavaScript class for building [composite structures](https://en.wikipedia.org/wiki/Composite_pattern). Suitable for use as a super class or mixin.
 * @module composite-class
 * @example
 * const Composite = require('composite-class')
 */

const _children = new WeakMap()
const _parent = new WeakMap()

/**
 * @alias module:composite-class
 */
class Composite {
  /**
   * Children
   * @type {Array}
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

  /**
   * Parent
   * @type {Composite}
   */
  get parent () {
    return _parent.get(this)
  }

  set parent (val) {
    _parent.set(this, val)
  }

  /**
   * Add a child
   * @param {Composite} child - the child node to add
   * @returns {Composite}
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
   * @returns {number}
   */
  getDescendentCount () {
    return Array.from(this).length
  }

  /**
   * prints a tree using the .toString() representation of each node in the tree
   * @returns {string}
   */
  tree () {
    return Array.from(this).reduce((prev, curr) => {
      return (prev += `${'  '.repeat(curr.level())}- ${curr}\n`)
    }, '')
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
  inspect (depth) {
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
   * @param {object} - The target class (or constructor function) to receive the state machine behaviour.
   */
  static mixInto (target) {
    for (const methodName of ['children', 'parent', 'add', 'append', 'prepend', 'remove', 'level', 'getDescendentCount', 'tree', 'root', 'inspect', 'parents', Symbol.iterator]) {
      const sourceMethod = Object.getOwnPropertyDescriptor(this.prototype, methodName)
      if (target.prototype === undefined) {
        Object.defineProperty(target, methodName, sourceMethod)
      } else {
        Object.defineProperty(target.prototype, methodName, sourceMethod)
      }
    }
    return target
  }
}

function isComposite (item) {
  return item && item.children && item.add && item.level && item.root
}

export default Composite
