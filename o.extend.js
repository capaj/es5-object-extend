Object.defineProperty(Object.prototype, "extend", {
	enumerable: false,
	writable: true,
	value: function(from) {
		var props = Object.getOwnPropertyNames(from);
		var index = props.length;
		while(index--) {
			var prop = props[index];

			var destination;
			if ('object' == typeof from[prop] && 'undefined' == typeof from[prop].indexOf && 'undefined' != typeof this[prop]) {
				destination = this[prop].extend(from[prop]);
			} else {
				destination = Object.getOwnPropertyDescriptor(from, prop);
			}

			var thisProps = Object.getOwnPropertyDescriptor(this, prop);
			if (!thisProps) {
				thisProps = Object.getOwnPropertyDescriptor(this.__proto__, prop);
			}
			if (thisProps) {
				if (destination.value && typeof thisProps.set === 'function') {
					this[prop] = from[prop];
				} else {
					var descriptorProps = Object.getOwnPropertyNames(destination);
					var descProp;
					while(descProp = descriptorProps.pop()) {	//iterate over property descriptor and copy each property from one to
						if (destination[descProp] !== undefined) {
							thisProps[descProp] = destination[descProp];
						}
					}
					Object.defineProperty(this, prop, thisProps);
				}
			} else {
				Object.defineProperty(this, prop, destination);
			}

		}

		return this;
	}
});

Object.defineProperty(Object.prototype, "copyOwnProperties", {	//a fast version for when you really just extend
	enumerable: false,
	writable: true,
	value: function(from) {
		var props = Object.getOwnPropertyNames(from);
		var prop;
		while(prop = props.pop()) {
			if (from.propertyIsEnumerable(prop)) {
				this[prop] = from[prop];
			}
		}

		return this;
	}
});