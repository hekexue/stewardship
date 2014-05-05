var env = require('../config/environment'),
	type = require('../lib/type'),
	logger = console,
	empty = function() {},
	MongoClient = require('mongodb').MongoClient;

function connect(callback) {
	MongoClient.connect(env.mongoConnection, function(err, db) {
		if (err) {
			logger.log(err);
		}
		if (type.isFunction(callback)) {
			callback(err, db);
		}
	})
}

simpleMongo = {
	mergeQueryPlan: function(first, second, op) {
		if (arguments.length === 1) {
			return first;
		}
		if (arguments.length === 2) {
			if (type.isObject(first) && type.isObject(second)) {
				op = "and";
			} else if (type.isObject(first) && type.isString(second)) {
				return first;
			}
		}

		var obj = {};
		switch (op) {
			case "and":
				obj.$and = [first, second];
				break;
			case "or":
				obj.$or = [first, second];
				break;
			case "nor":
				obj.$nor = [first, second];
				break;
		}
		return obj;
	},
	parseChanges: function(data) {
		var changes = null;
		if (type.isObject(data)) {
			changes = {
				$set: {}
			};
			for (var i in data) {
				if (data.hasOwnProperty(i)) {
					changes.$set.i = data[i];
				}
			}
		}
		return changes;
	},
	find: function(collectionName, query, callback) {
		try {
			connect(function(err, db) {
				db.collection(collectionName).find(query || {}, callback);
			})
		} catch (e) {
			console.log(e);
			throw e;
		}
	},
	findOne: function(collectionName, query, options, callback) {
		switch (arguments.length) {
			case 3:
				{
					if (type.isFunction(options)) {
						callback = options,
						options = {};
					} else {
						callback = empty;
					}

				}
				break;
			case 2:
				{
					callback = function() {};
					options = {};
				}
				break;
			default:
				break;
		}
		try {
			connect(function(err, db) {
				db.collection(collectionName).findOne(query || {}, options, callback);
			})
		} catch (e) {
			console.log(e);
			throw e;
		}
	},
	save: function(collectionName, doc, options, callback) {
		switch (arguments.length) {
			case 3:
				{
					if (type.isFunction(options)) {
						callback = options,
						options = {};
					} else {
						callback = empty;
					}
				}
				break;
			case 2:
				{
					callback = function() {};
					options = {};
				}
				break;
			default:
				break;
		}
		try {
			connect(function(err, db) {
				db.collection(collectionName).save(doc, options, callback);
			});
		} catch (e) {
			console.log(e);
			throw e;
		}
	},
	insert: function(collectionName, docs, options, callback) {
		switch (arguments.length) {
			case 3:
				{
					if (type.isFunction(options)) {
						callback = options,
						options = {};
					} else {
						callback = empty;
					}
				}
				break;
			case 2:
				{
					callback = empty;
					options = {};
				}
				break;
			default:
				break;
		}
		try {
			connect(function(err, db) {
				db.collection(collectionName).insert(docs, options, callback);
			});
		} catch (e) {
			console.log(e);
			throw e;
		}
	},
	update: function(collectionName, criteria, objNew, options, callback) {
		switch (arguments.length) {
			case 4:
				{
					if (type.isFunction(options)) {
						callback = options,
						options = {};
					} else {
						callback = empty;
					}

				}
				break;
			case 3:
				{
					callback = empty;
					options = {};
				}
				break;
			default:
				break;
		}
		try {
			connect(function(err, db) {
				db.collection(collectionName).update(criteria, objNew, options, callback);
			});
		} catch (e) {
			console.log(e);
			throw e;
		}
	},
	findAndModify: function(collectionName, query, sort, update, options, callback) {
		switch (arguments.length) {
			case 5:
				{
					if (type.isFunction(options)) {
						callback = options,
						options = {};
					} else {
						callback = empty;
					}
				}
				break;
			case 4:
				{
					callback = empty;
					options = {};
				}
				break;
			default:
				break;
		}
		try {
			connect(function(err, db) {
				db.collection(collectionName).findAndModify(query, sort, update, options, callback);
			});
		} catch (e) {
			console.log(e);
			throw e;
		}
	},
	remove: function(collectionName, query, justOne, callback) {
		if (arguments.length === 3) {
			callback = empty;
		}
		try {
			connect(function(err, db) {
				db.collection(collectionName).remove(query, justOne, callback);
			});
		} catch (e) {
			console.log(e);
			throw e;
		}
	},
	execMongo: function() {
		var collection = null,
			execName = arguments[0],
			collectionName = arguments[1],
			args = Array.prototype.slice.call(arguments, 2);
		try {
			connect(function(err, db) {
				collection = db.collection(collectionName);
				args.push(collection);
				args.push(db);
				collection[execName].apply(collection, args);
			});
		} catch (e) {
			console.log(e);
			throw e;
		}
	}
}

module.exports = simpleMongo;