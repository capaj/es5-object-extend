es5-object-extend
====================

Object.extend() for node.js and the browser. ES5 compatible. ES5 incompatible enviroments are not supported(IE8 and less).

##Why use this and not other implementation? 
Because this is only extend which can properly merge ES5 property descriptors, which means that if you merge object a with a setter and object b with getter on same property, result will have both getter and setter on that property.
So you don't lose any of your property descriptors when extending your objects.
Also you won't lose a setter when object which is extending base has a value, then the setter is not replaced, but instead it is called with the value as you would probably expect.

