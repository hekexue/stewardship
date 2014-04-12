var db = require("../lib/simplemongo"),
	type = require("../lib/type"),
	logger = console;
module.exports = {
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
					callback(err,"");
					return;
				}
				result.toArray(function(err,docs){
					if(err){
						logger.log(err);
						callback(err,"");
						return ;
					}
					callback("ok",docs);	
				})
				
			})
		}
	}
}