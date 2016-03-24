[![view on npm](http://img.shields.io/npm/v/composite-class.svg)](https://www.npmjs.org/package/composite-class)
[![npm module downloads](http://img.shields.io/npm/dt/composite-class.svg)](https://www.npmjs.org/package/composite-class)
[![Build Status](https://travis-ci.org/jsdoc2md/composite-class.svg?branch=master)](https://travis-ci.org/jsdoc2md/composite-class)
[![Dependency Status](https://david-dm.org/jsdoc2md/composite-class.svg)](https://david-dm.org/jsdoc2md/composite-class)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

<a name="module_composite-class"></a>

## composite-class

* [composite-class](#module_composite-class)
    * [~Composite](#module_composite-class..Composite)
        * [.children](#module_composite-class..Composite.Composite+children) : <code>Array</code>
        * [.parent](#module_composite-class..Composite.Composite+parent) : <code>Composite</code>
        * [.add()](#module_composite-class..Composite+add) ⇒ <code>Composite</code>
        * [.append(child)](#module_composite-class..Composite+append) ⇒ <code>Composite</code>
        * [.prepend(child)](#module_composite-class..Composite+prepend) ⇒ <code>Composite</code>
        * [.remove(child)](#module_composite-class..Composite+remove) ⇒ <code>Composite</code>
        * [.replace(findQuery, replaceWith)](#module_composite-class..Composite+replace)
        * [.level()](#module_composite-class..Composite+level) ⇒ <code>number</code>
        * [.getDescendentCount()](#module_composite-class..Composite+getDescendentCount) ⇒ <code>number</code>
        * [.tree()](#module_composite-class..Composite+tree) ⇒ <code>string</code>
        * [.root()](#module_composite-class..Composite+root) ⇒ <code>Composite</code>
        * [.Symbol.iterator()](#module_composite-class..Composite+Symbol.iterator)
        * [.inspect()](#module_composite-class..Composite+inspect)

<a name="module_composite-class..Composite"></a>

### composite-class~Composite
A base class for building standard composite structures.

**Kind**: inner class of <code>[composite-class](#module_composite-class)</code>  

* [~Composite](#module_composite-class..Composite)
    * [.children](#module_composite-class..Composite.Composite+children) : <code>Array</code>
    * [.parent](#module_composite-class..Composite.Composite+parent) : <code>Composite</code>
    * [.add()](#module_composite-class..Composite+add) ⇒ <code>Composite</code>
    * [.append(child)](#module_composite-class..Composite+append) ⇒ <code>Composite</code>
    * [.prepend(child)](#module_composite-class..Composite+prepend) ⇒ <code>Composite</code>
    * [.remove(child)](#module_composite-class..Composite+remove) ⇒ <code>Composite</code>
    * [.replace(findQuery, replaceWith)](#module_composite-class..Composite+replace)
    * [.level()](#module_composite-class..Composite+level) ⇒ <code>number</code>
    * [.getDescendentCount()](#module_composite-class..Composite+getDescendentCount) ⇒ <code>number</code>
    * [.tree()](#module_composite-class..Composite+tree) ⇒ <code>string</code>
    * [.root()](#module_composite-class..Composite+root) ⇒ <code>Composite</code>
    * [.Symbol.iterator()](#module_composite-class..Composite+Symbol.iterator)
    * [.inspect()](#module_composite-class..Composite+inspect)

<a name="module_composite-class..Composite.Composite+children"></a>

#### composite.children : <code>Array</code>
children

**Kind**: instance property of <code>[Composite](#module_composite-class..Composite)</code>  
<a name="module_composite-class..Composite.Composite+parent"></a>

#### composite.parent : <code>Composite</code>
parent

**Kind**: instance property of <code>[Composite](#module_composite-class..Composite)</code>  
<a name="module_composite-class..Composite+add"></a>

#### composite.add() ⇒ <code>Composite</code>
Add a child

**Kind**: instance method of <code>[Composite](#module_composite-class..Composite)</code>  
<a name="module_composite-class..Composite+append"></a>

#### composite.append(child) ⇒ <code>Composite</code>
**Kind**: instance method of <code>[Composite](#module_composite-class..Composite)</code>  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Composite</code> | the child node to append |

<a name="module_composite-class..Composite+prepend"></a>

#### composite.prepend(child) ⇒ <code>Composite</code>
**Kind**: instance method of <code>[Composite](#module_composite-class..Composite)</code>  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Composite</code> | the child node to prepend |

<a name="module_composite-class..Composite+remove"></a>

#### composite.remove(child) ⇒ <code>Composite</code>
**Kind**: instance method of <code>[Composite](#module_composite-class..Composite)</code>  

| Param | Type | Description |
| --- | --- | --- |
| child | <code>Composite</code> | the child node to remove |

<a name="module_composite-class..Composite+replace"></a>

#### composite.replace(findQuery, replaceWith)
**Kind**: instance method of <code>[Composite](#module_composite-class..Composite)</code>  

| Param | Type |
| --- | --- |
| findQuery | <code>test</code> | 
| replaceWith | <code>\*</code> | 

<a name="module_composite-class..Composite+level"></a>

#### composite.level() ⇒ <code>number</code>
depth level in the tree, 0 being root.

**Kind**: instance method of <code>[Composite](#module_composite-class..Composite)</code>  
<a name="module_composite-class..Composite+getDescendentCount"></a>

#### composite.getDescendentCount() ⇒ <code>number</code>
**Kind**: instance method of <code>[Composite](#module_composite-class..Composite)</code>  
<a name="module_composite-class..Composite+tree"></a>

#### composite.tree() ⇒ <code>string</code>
prints a tree using the .toString() representation of each node in the tree

**Kind**: instance method of <code>[Composite](#module_composite-class..Composite)</code>  
<a name="module_composite-class..Composite+root"></a>

#### composite.root() ⇒ <code>Composite</code>
Returns the root instance of this tree.

**Kind**: instance method of <code>[Composite](#module_composite-class..Composite)</code>  
<a name="module_composite-class..Composite+Symbol.iterator"></a>

#### composite.Symbol.iterator()
default iteration strategy

**Kind**: instance method of <code>[Composite](#module_composite-class..Composite)</code>  
<a name="module_composite-class..Composite+inspect"></a>

#### composite.inspect()
Used by node's `util.inspect`.

**Kind**: instance method of <code>[Composite](#module_composite-class..Composite)</code>  

* * *

&copy; 2016 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
