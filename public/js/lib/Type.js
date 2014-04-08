define(function() {
	var toString = Object.prototype.toString,
		domReg = /[object HTML[a-zA-Z]*Element]/g;
	return {
		isFunction: function(obj) {
			return toString.call(obj) === "[object Function]";
		},
		isString: function(obj) {
			return toString.call(obj) === "[object String]";
		},
		isNumber: function(obj) {
			return toString.call(obj) === "[object Number]";
		},
		isDom: function(obj) {
			return domReg.test(Obj.toString.call(obj)); // === "[object HTMLDOMObject]"
		},
		isArray: function(obj) {
			return toString.call(obj) === "[object Array]";
		},
		isObject: function(obj) {
			return toString.call(obj) === "[object Object]";
		},
		isNull: function(obj) {
			return toString.call(obj) === "[object Null]";
		},
		isUndefined: function(obj) {
			return toString.call(obj) === "[object Undefined]";
		},
		isExist: function(obj) {
			return !this.isNull(obj) && !this.isUndefined(obj);
		},
		isNaN: function(obj) {
			return obj != obj;
		},
		isError: function(obj) {
			return toString.call(obj) === "[object Error]";
		}
	}
})