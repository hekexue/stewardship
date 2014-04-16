var CONST = {
	controllerPath: __dirname + "/../controllers"
},
	type = require("../lib/type"),
	queryParser = require("../lib/requestParser"),
	fs = require("fs"),
	controllers = {},
	inited = false;

module.exports = {
	init: function() {
		if (inited === false) {
			inited = true;
			//get route files and read the names
			fs.readdir(CONST.controllerPath, function(err, files) {
				if (err) {
					console.log(err);
				}
				//console.log(files);
				if (files) {
					for (var i = 0, len = files.length; i < len; i++) {
						f = files[i];
						controllers[f.replace(".js", "")] = require(CONST.controllerPath + "/" + f);
					}
				}

			});
		}
	},
	index: function(req, res) {
		var args = [req, res],
			param = queryParser.params(req),
			controller = controllers[param.controller],
			action;
		if (type.isObject(controller)) {
			action = controller[param.action];
			if (type.isFunction(action)) {
				args.push(param.data);
				action.apply(controller, args);
			}
		}
	}
}