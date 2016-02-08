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
    this.children.push(child)
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
