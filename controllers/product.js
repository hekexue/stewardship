var model = require("../models/product"),
	resHelper = require("../lib/responseHelper");
module.exports = {
	list: function(req, res, param) {
		model.list(param, function(status, data) {
			var result = resHelper.resData(status, data);
			res.writeHead(200, {
				'content-type': 'text/plain'
			});
			res.end(JSON.stringify(result), "utf-8");
		});
	},
	add: function(req, res, param) {
		model.add(param, function(status, data) {
			var result = resHelper.resData(status, data);
			res.writeHead(200, {
				'content-type': 'text/plain'
			});
			res.end(JSON.stringify(result), "utf-8");
		})
	},
	update: function(req, res, param) {
		model.update(param, function(status, data) {
			var result = resHelper.resData(status, data);
			res.writeHead(200, {
				'content-type': 'text/plain'
			});
			res.end(JSON.stringify(result), "utf-8");
		})
	},
	remove: function(req, res, param) {
		model.remove(param, function(status, data) {
			var result = resHelper.resData(status, data);
			res.writeHead(200, {
				'content-type': 'text/plain'
			});
			res.end(JSON.stringify(result), "utf-8");
		})
	},
	read: function(req, res, param) {
		model.read(param, function(status, data) {
			var result = resHelper.resData(status, data);
			res.writeHead(200, {
				'content-type': 'text/plain'
			});
			res.end(JSON.stringify(result), "utf-8");
		})
	}
}