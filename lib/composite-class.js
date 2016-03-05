'use strict'

/**
 * @module composite-class
 */

/**
 * @alias module:composite-class
 */
class Composite {
  constructor () {
    /**
     * children
     * @type {Array}
     */
    this.children = []

    /**
     * parent
     * @type {Composite}
     */
    this.parent = null
  }

  /**
   * Add a child
   */
  add (child) {
    if (!(child instanceof Composite)) throw new Error('can only add a Composite instance')
    child.parent = this
    this.children.push(child)
    return child
  }

  remove (child) {
    return this.children.splice(this.children.indexOf(child), 1)
  }

  setParent (parent) {
    this.parent = parent
    parent.add(this)
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

  getDescendentCount () {
    return Array.from(this).length
  }

  /**
   * prints a tree using the .toString() representation of each node in the tree
   * @returns {string}
   */
  tree () {
    let output = ''
    for (let item of this) {
      output += `${'  '.repeat(item.level())}- ${item}\n`
    }
    return output
  }

  /**
   * Returns the root instance of this tree.
   * @returns {module:composite-class}
   */
  root () {
    function getRoot (composite) {
      return composite.parent === null ? composite : getRoot(composite.parent)
    }
    return getRoot(this)
  }

  /**
   * default iteration strategy
   */
  * [Symbol.iterator] () {
    yield this
    for (let child of this.children) {
      yield* child
    }
  }

  /**
   * Defines what will be yielded when iterating this tree
   * @param {function} - generator function
   */
  setIterationStrategy (strategy) {
    this[Symbol.iterator] = strategy
  }
}

module.exports = Composite
