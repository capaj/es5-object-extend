if (!Object.hasOwnProperty('extend')) {
  Object.defineProperty(Object, 'extend', {
    enumerable: false,
    writable: true,
    value: function (to, from) {
      var props = Object.getOwnPropertyNames(from)
      var index = props.length
      while (index--) {
        var prop = props[index]

        var destination
        var val = from[prop]
        if (val === Object(val) && typeof from[prop].indexOf === 'undefined' && typeof to[prop] !== 'undefined') {
          destination = Object.extend(to[prop], from[prop])
        } else {
          destination = Object.getOwnPropertyDescriptor(from, prop)
        }

        var thisProps = Object.getOwnPropertyDescriptor(to, prop)
        if (!thisProps) {
          thisProps = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(to), prop)
        }
        if (thisProps) {
          if (destination.value && typeof thisProps.set === 'function') {
            to[prop] = from[prop]
          } else {
            var descriptorProps = Object.getOwnPropertyNames(destination)
            var descProp
            while(descProp = descriptorProps.pop()) {	// iterate over property descriptor and copy each property from one to
              if (destination[descProp] !== undefined) {
                thisProps[descProp] = destination[descProp]
              }
            }
            Object.defineProperty(to, prop, thisProps)
          }
        } else {
          Object.defineProperty(to, prop, destination)
        }
      }
      return to
    }
  })

  Object.defineProperty(Object, 'copyOwnProperties', {	// a fast version for when you really just extend
    enumerable: false,
    writable: true,
    value: function (to, from) {
      var props = Object.getOwnPropertyNames(from)
      var prop
      while (prop = props.pop()) {
        if (from.propertyIsEnumerable(prop)) {
          to[prop] = from[prop]
        }
      }
      return to
    }
  })
}
