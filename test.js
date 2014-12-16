require('./o.extend');
var a = {get prop() {return [];}};

var c = {
	timeout: false,
	name: 'a'
};
var d = {
	name: 'b',
	author: 'username'
};

module.exports = {
	numbers: function(test) {
		var extended = {a:10, b: 0, c: -10};
		extended.extend({a:0, b:20, g: 0});

		test.deepEqual({a:0, b: 20, c:-10, g: 0}, extended);
		test.done();
	},
	getter: function (test) {
		var extended = {}.extend(a);
		test.equals(Object.getOwnPropertyDescriptor(extended, 'prop').get.toString(), "function prop() {return [];}");
		test.done();
	},
	getterOnProto: function(test) {
		var Ct = function() {};
		Ct.prototype = {
			get prop() {return this._b;},
			set prop(val){this._b = val; }
		};

		var inst = new Ct();
		inst.extend({prop: 5});
		test.equals(inst._b, 5);
		test.done();
	},
	typical: function(test) {
		c.extend(d);
		test.equals(c.name, 'b');
		test.equals(c.author, 'username');
		test.done();
	},
	getterOverriden: function (test) {
		var override = {get prop() {return 2;}};
		a.extend(override);

		test.equals(a.prop, 2);

		test.done();
	},
	setterOverriden: function (test) {
		var base = {
			get prop() {return this._b;},
			set prop(val){this._b = val; },
			_b: 3
		};

		var override = {set prop(val){this._c = val;}};
		base.extend(override);
		base.prop = 6;

		test.equals(base.prop, 3);
		test.equals(base._b, 3);
		test.equals(base._c, 6);

		test.done();
	},
	valueAssignedWhenSetterExists: function (test) {
		var base = {get prop() {return this._b;}, set prop(val){this._b = val;}};

		var override = {prop: 5};
		base.extend(override);

		test.equals(base._b, 5);
		test.equals(base.prop, 5);

		test.done();
	},
	ownPropsCopy: function(test) {
		var Ct = function() {
			this.secondProp = 1;
		};
		Ct.prototype = {
			get prop() {return this._b;},
			set prop(val){this._b = val; }
		};

		var obj = {prop: 5};
		obj.copyOwnProperties(new Ct());

		test.equals(obj.secondProp, 1);
		test.equals(obj.prop, 5);
		test.equals(obj._b, undefined);

		test.done();

	}
};