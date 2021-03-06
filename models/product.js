var db = require("../lib/simplemongo"),
	type = require("../lib/type"),
	ObjectID = require('mongodb').ObjectID,
	logger = console;

module.exports = {
	validCheck: function(data) {
		//TODO:check data 
		return true;
	},
	list: function(data, callback) {
		var query = {
			$or: [{
				deleted: {
					$in: [false, "false"]
				}
			}, {
				deleted: {
					$exists: false
				}
			}]
		};
		if (data) {
			query = db.mergeQueryPlan(data, query, "and");
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
				data.record.deleted = false;
			}
			if (type.isFunction(callBack)) {
				db.insert("product", data.record, null, function(err, doc) {
					if (err) {
						logger.log(err);
						callBack(err, "");
						return;
					}
					doc[0].id = doc[0]._id.toString();
                    if(doc[0].stewardship){
                        doc[0].stewardship._id = doc[0].id;
                    }
					callBack("ok", doc[0]);
				});
			}
		} else {
			callBack(ckres, null);
		}
	},
	remove: function(data, callBack) {
		var ids = [];
		try {
			if (type.isString(data)) {
				ids = [new ObjectID(data)];
			} else if (type.isObject(data)) {
				ids = [new ObjectID(data.id)];
			} else if (type.isArray(data)) {
				for (var i = 0, len = data.length; i < len; i++) {
					ids.push(new ObjectID(data[i].id));
				}
			}
			if (type.isFunction(callBack)) {
				//update: function(collectionName, criteria, objNew, options, callback) {
				db.update("product", {
					_id: {
						$in: ids
					}
				}, {
					$set: {
						deleted: true
					}
				}, function(err, doc) {
					if (err) {
						logger.log(err);
						callBack(err, doc);
						return;
					}
					callBack("ok", doc);
				})
			}
		} catch (e) {
			callBack(e, "");
		}
	},
	read: function(data, callBack) {
		var id = data && data.id;
		if (id) {
			db.findOne("product", {
				_id: new ObjectID(id)
			}, function(err, doc) {
				if (err) {
					logger.log(err);
					callBack(err, doc);
					return;
				}
				callBack("ok", doc);
			});
		} else {
			callBack("badparam", "")
		}
	},
	/**
	 * 更新单条数据记录，覆盖原来的记录
	 * @param  {object} data     数据记录对象
	 * @param  {function} callBack 回调函数
	 * @return {[type]}          [description]
	 */
	update: function(data, callBack) {
		var id = data && data.id;
		if (id) {
			var updateObj = data.data;
			delete updateObj._id;
			db.findAndModify("product", {
				_id: new ObjectID(id)
			}, {}, data.data, function(err, doc) {
				if (err) {
					logger.log(err);
					callBack(err, doc);
					return;
				}
				callBack("ok", doc);
			})
		}
	},
	/**
	 * 差异化更新数据记录（只保存变动的字段）
	 * @param  {object} data     要更新的数据记录
	 * @param  {function} callBack 回调函数
	 * @return {[type]}          [description]
	 */
	saveChanges: function(data, callBack) {
		var id = data && data.id,
			update = null;
		if (id) {
			update = db.parseChanges(data);
			db.findAndModify("product", {
				_id: new ObjectID(id)
			}, {}, data, function(err, doc) {
				if (err) {
					logger.log(err);
					callBack(err, doc);
					return;
				}
				callBack("ok", doc);
			})
		}
	}
}