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
	}
};