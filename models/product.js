var db = require("../lib/simplemongo"),
	type = require("../lib/type"),
	logger = console;
module.exports = {
	validCheck: function(data) {
		//TODO:check data 
		return true;
	},
	list: function(data, callback) {
		var query = {};
		if (data) {
			//process the query conditions that passed in from client side;
		}
		if (type.isFunction(callback)) {
			db.find("product", query, function(err, result) {
				var hasErr = false;
				if (err) {
					logger.log(err);
					callback(err, "");
					return;
				}
				result.toArray(function(err, docs) {
					if (err) {
						logger.log(err);
						callback(err, "");
						return;
					}
					callback("ok", docs);
				})
			})
		}
	},
	add: function(data, callBack) {
		var ckres = this.validCheck(data);
		if (ckres === true) {
			console.log(data);
			if (data.record._id === "0") {
				data.record._id = undefined;
			}
			if (type.isFunction(callBack)) {
				db.insert("product", data.record, null, function(err, doc) {
					if (err) {
						logger.log(err);
						callBack(err, "");
						return;
					}
					doc[0].id = doc[0]._id.toString();
					callBack("ok", doc[0]);
				})
			}
		} else {
			callBack(ckres, null);
		}
	}
}