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

			if (this.hasOwnProperty(prop)) {
				if (destination.value && typeof Object.getOwnPropertyDescriptor(this, prop).set === 'function') {
					this[prop] = from[prop];
				} else {
					var mergedProps = Object.getOwnPropertyDescriptor(this, prop);
					var descriptorProps = Object.getOwnPropertyNames(destination);
					var i = descriptorProps.length;
					while(i--) {
						var descProp = descriptorProps[i];
						if (destination[descProp] !== undefined) {
							mergedProps[descProp] = destination[descProp];
						}
					}
					Object.defineProperty(this, prop, mergedProps);
					return this;
				}
			} else {
				Object.defineProperty(this, prop, destination);
			}

		}

        return this;
    }
});