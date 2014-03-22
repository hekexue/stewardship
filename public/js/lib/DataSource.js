define(["jquery", "./Type", "ErrorManager"], function($, type) {
	function transfer(options) {

	}

	function sussess(res, callback, onGlobalError) {
		var globalErr = (("," + CONST.GLOBALERROR.join(",") + ",").indexOf("," + res._r_ + ",") > -1);
		if (globalErr) {
			if (type.isFunction(onGlobalError)) {
				onGlobalError(res);
			} else {
				fail(res);
			}
		} else {
			if (type.isFunction(callback)) {
				callback(res);
			}
		}
	}

	function fail(res) {

	}

	var CONST = {
		METHOD: "GET",
		FORMAT: "JSON",
		GLOBALERROR: ["notLogin", "noAuth", "sessionNotFound"]
	},
		ds = {
			/**
			 * start a server request
			 *
			 * you can use this method like this;
			 *	request("get",{contoller:"",action:'',data:{},success:function(){},fail:function(){},globalErr:function(){}},"json")
			 *or
			 *	request({contoller:"",action:'',data:{},success:function(){},fail:function(){},globalErr:function(){}},"json");
			 *or
			 *	request({contoller:"",action:'',data:{},success:function(){},fail:function(){},globalErr:function(){}})
			 *
			 */
			request: function(method, option, format) {
				if (arguments.length === 0) {
					throw new Error("a server request need at leat a 'data' param");
				}
				if (type.isObject(method)) {
					switch (arguments.length) {
						case 1:
							option = method,
							method = CONST.METHOD,
							format = CONST.FORMAT;
							break;
						case 2:
							format = option,
							option = method,
							method = CONST.METHOD;
							break;
						default:
							break;
					}
				} else if (type.isString(method)) {
					switch (arguments.length) {
						case 1:
							throw new Error("need a 'data' param in method 'request'");
						case 2:
							format = CONST.FORMAT;
							break;
					}
				}

				!format && (method = CONST.METHOD);
				transfer(options);

			},
			postJSON: function(options) {
				if (!type.isObject(options)) {
					throw new Error("method 'postJSON' need an 'option' param");
				}
				this.request("POST", options, CONST.FORMAT);
			},
			getJSON: function() {
				if (!type.isObject(options)) {
					throw new Error("method 'postJSON' need an 'option' param");
				}
				this.request(options, CONST.FORMAT);
			},
			simpleRqst: function(url, callback) {
				var opt = {};
				if (type.isString(url)) {
					opt.url = url;
					type.isFunction(callback) && (opt.success = callback);
					this.request(opt);
				} else {
					throw new Error("method 'simpleRqst' need a 'url' param or the type of 'url' param is not right which should be a string")
				}
			}
		}
	return ds;
})