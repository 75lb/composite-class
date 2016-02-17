[![view on npm](http://img.shields.io/npm/v/composite-class.svg)](https://www.npmjs.org/package/composite-class)
[![npm module downloads](http://img.shields.io/npm/dt/composite-class.svg)](https://www.npmjs.org/package/composite-class)
[![Build Status](https://travis-ci.org/jsdoc2md/composite-class.svg?branch=master)](https://travis-ci.org/jsdoc2md/composite-class)
[![Dependency Status](https://david-dm.org/jsdoc2md/composite-class.svg)](https://david-dm.org/jsdoc2md/composite-class)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

<a name="module_composite-class"></a>
## composite-class
  

* composite-class
    * [Composite](#exp_module_composite-class--Composite) ⏏
        * [.children](#module_composite-class--Composite.Composite+children) : `Array`
        * [.parent](#module_composite-class--Composite.Composite+parent) : `Composite`
        * [.add()](#module_composite-class--Composite+add)
        * [.level()](#module_composite-class--Composite+level) ⇒ `number`
        * [.tree()](#module_composite-class--Composite+tree) ⇒ `string`
        * [.root()](#module_composite-class--Composite+root) ⇒ [`Composite`](#exp_module_composite-class--Composite)
        * [.Symbol.iterator()](#module_composite-class--Composite+Symbol.iterator)


<a name="exp_module_composite-class--Composite"></a>
### Composite ⏏
**Kind**: Exported class


<a name="module_composite-class--Composite.Composite+children"></a>
#### composite.children : `Array`
children

**Kind**: instance property of [`Composite`](#exp_module_composite-class--Composite)


<a name="module_composite-class--Composite.Composite+parent"></a>
#### composite.parent : `Composite`
parent

**Kind**: instance property of [`Composite`](#exp_module_composite-class--Composite)


<a name="module_composite-class--Composite+add"></a>
#### composite.add()
Add a child

**Kind**: instance method of [`Composite`](#exp_module_composite-class--Composite)


<a name="module_composite-class--Composite+level"></a>
#### composite.level() ⇒ `number`
depth level in the tree, 0 being root.

**Kind**: instance method of [`Composite`](#exp_module_composite-class--Composite)


<a name="module_composite-class--Composite+tree"></a>
#### composite.tree() ⇒ `string`
prints a tree using the .toString() representation of each node in the tree

**Kind**: instance method of [`Composite`](#exp_module_composite-class--Composite)


<a name="module_composite-class--Composite+root"></a>
#### composite.root() ⇒ [`Composite`](#exp_module_composite-class--Composite)
Returns the root instance of this tree.

**Kind**: instance method of [`Composite`](#exp_module_composite-class--Composite)


<a name="module_composite-class--Composite+Symbol.iterator"></a>
#### composite.Symbol.iterator()
default iteration strategy

**Kind**: instance method of [`Composite`](#exp_module_composite-class--Composite)




* * *

&copy; 2016 Lloyd Brookes <75pound@gmail.com>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
