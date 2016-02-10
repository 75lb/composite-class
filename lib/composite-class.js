'use strict'

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
    child.parent = this
    this.children.push(child)
    return child
  }

  setParent (parent) {
    this.parent = parent
    parent.add(this)
  }

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
   * prints a tree using the .toString() representation of each node in the tree
   */
  tree () {
    let output = ''
    for (let item of this) {
      output += `${'  '.repeat(item.level())}- ${item}\n`
    }
    return output
  }

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
}

module.exports = Composite
