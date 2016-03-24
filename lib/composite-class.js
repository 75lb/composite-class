'use strict'
const findReplace = require('find-replace')
const arrayify = require('array-back')

/**
 * @module composite-class
 */
 
/**
 * A base class for building standard composite structures.
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
   * @returns {Composite}
   */
  add (child) {
    if (!(child instanceof Composite)) throw new Error('can only add a Composite instance')
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
   * @param {test} findQuery
   * @param {*} replaceWith
   */
  replace (findQuery, replaceWith) {
    findReplace(this.children, findQuery, replaceWith)
    arrayify(replaceWith).forEach(item => item.parent = this)
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
    let output = ''
    for (let item of this) {
      output += `${'  '.repeat(item.level())}- ${item}\n`
    }
    return output
  }

  /**
   * Returns the root instance of this tree.
   * @returns {Composite}
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
   * Used by node's `util.inspect`.
   */
  inspect (depth) {
    const clone = Object.assign({}, this)
    delete clone.parent
    return clone
  }
}

module.exports = Composite
