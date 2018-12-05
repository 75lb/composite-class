(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Composite = factory());
}(this, (function () { 'use strict';

  /**
   * @module composite-class
   */

  /**
   * A base class for building standard composite structures.
   * @alias module:composite-class
   */
  class Composite {
    constructor () {
      /**
       * children
       * @type {Array}
       */
      this.children = [];

      /**
       * parent
       * @type {Composite}
       */
      this.parent = null;
    }

    /**
     * Add a child
     * @returns {Composite}
     */
    add (child) {
      if (!(child instanceof Composite)) throw new Error('can only add a Composite instance')
      child.parent = this;
      this.children.push(child);
      return child
    }

    /**
     * @param {Composite} child - the child node to append
     * @returns {Composite}
     */
    append (child) {
      if (!(child instanceof Composite)) throw new Error('can only add a Composite instance')
      child.parent = this;
      this.children.push(child);
      return child
    }

    /**
     * @param {Composite} child - the child node to prepend
     * @returns {Composite}
     */
    prepend (child) {
      if (!(child instanceof Composite)) throw new Error('can only add a Composite instance')
      child.parent = this;
      this.children.unshift(child);
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
      let count = 0;
      function countParent (composite) {
        if (composite.parent) {
          count++;
          countParent(composite.parent);
        }
      }
      countParent(this);
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
        return prev += `${'  '.repeat(curr.level())}- ${curr}\n`
      }, '')
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
      yield this;
      for (let child of this.children) {
        yield * child;
      }
    }

    /**
     * Used by node's `util.inspect`.
     */
    inspect (depth) {
      const clone = Object.assign({}, this);
      delete clone.parent;
      return clone
    }

    /**
     * Returns an array of ancestors
     * @return {Composite[]}
     */
    parents () {
      const output = [];
      function addParent (node) {
        if (node.parent) {
          output.push(node.parent);
          addParent(node.parent);
        }
      }
      addParent(this);
      return output
    }
  }

  return Composite;

})));
