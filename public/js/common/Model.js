define(["jquery", "./DataSource", "../lib/Pubsub", "../lib/Event", "./CONST", "../lib/Type"], function($, Ds, pubSub, Evt, cst, type) {

	function mergeOpt(cfg, cb) {
		var success = null;
		if (typeof cb === "function") {
			typeof cfg.success === "function" ? (success = cfg.success, cfg.success = function(data) {
				success(data);
				cb(data)
			}) : cfg.success = cb;
		}
		return cfg;
	}

	function publishToView(name) {
		var args = Array.prototype.slice.call(arguments, 1);
		args.unshift(name);
		pubsub.publish.apply(pubsub, args);
	}

	function checkChange(instance, attr, val) {
		if (instance.original[attr] !== val) {
			instance.changes.push(attr);
		} else {
			for (var j = 0, len = instance.changes.length; j < len; j++) {
				if (instance.changes[j] === attr) {
					instance.changes.splice(j, 1);
					j--;
					len--;
				}
			}
		}
	}

	function getUpdateProperty(instance) {
		var i = 0,
			r = null,
			changes = instance.changes,
			data = instance.attributes,
			result = {};
		for (; r = changes[i]; i++) {
			result[r] = data[r];
		}
		return result;
	}

	var pubsub = pubSub.getInstance(),
		CONST = cst,
		Model = Evt.extend({
			init: function(options) {
				options ? "" : options = {};
				this._super(options);
				//this.parent = options.parent || Model;
				this.attributes = options.data || {};
				this.original = $.extend({}, this.attributes);
				this.changes = [];
				this.synced = false;
				this.remoteActions ? "" : (this.remoteActions = this.parent.remoteActions || {});
			},
			/**
			 * 设置数据记录的值
			 * @summary	开发者调用数据记录的set方法，都会触发视图同步函数；
			 *          内部调用数据记录的set方法进行服务端、客户端数据同步时，也会再触发视图同步函数，而在不要求客户端数据安全的情况下不再触发。
			 * @param {string or Object} attr 数据属性名称   或   包含属性数据的对象
			 * @param {Any  or Boolean} val  属性的值，或，“是否同步客户端的值”
			 */
			set: function(attr, val) {
				var publishToView = true;
				if (type.isString(attr) && arguments.length >= 2) {
					if (!CONST.DATASAFE && arguments[2] === true) {
						publishToView = false;
					}
					return this.parent.set(this.id, attr, val, publishToView, arguments[2]);
				}
				if (type.isObject(attr) && arguments.length >= 1) {
					if (!CONST.DATASAFE && arguments[2] === true) {
						publishToView = false;
					}
					return this.parent.set(this.id, attr, publishToView, arguments[1]);
				}
			},
			/**
			 * 保存之前，合并回调函数，在合并的回调函数中，触发afterSave事件处理函数
			 * @param  { object } cfg 配置项
			 * @return {[type]}         [description]
			 */
			beforeSave: function(cfg, cb) {
				var success = null,
					me = this;
				if (typeof cb === "function") {
					typeof cfg.success === "function" ? (success = cfg.success, cfg.success = function(data) {
						me.afterSave(res);
						success(data);
						cb(data);
					}) : cfg.success = function(res) {
						me.afterSave(res);
						cb(data);
					};
				} else {
					typeof cfg.success === "function" ? (success = cfg.success, cfg.success = function(data) {
						me.afterSave(res);
						success(data);
					}) : cfg.success = function(res) {
						me.afterSave(res);
					};
				}
				return cfg;
			},
			/**
			 * 保存记录
			 * @param  {Function} cb 保存成功后的回调函数
			 * @return {[type]}      [description]
			 */
			save: function(cb) {
				var cfg = this.remoteActions["save"],
					success = null;
				if (!type.isObject(cfg)) {
					throw new Error("config of save action not defined");
				}
				cfg.data ? cfg.data["record"] = this.attributes : cfg.data = {
					record: this.attributes
				}
				cfg = this.beforeSave(cfg, cb);
				Ds.postJSON(cfg);
			},
			/**
			 * 保存成功后，调用同步客户端数据的函数，确保客户端缓存和服务端数据保持一致
			 * @param  {object} res 服务端返回的数据
			 * @return {[type]}     [description]
			 */
			afterSave: function(res) {
				//以下代码不建议 overwrite，如果要overwrite，则调用this._super();来完成MVC框架内部的数据处理逻辑
				if (res[CONST.RESSTATUS] === CONST.RESSTATUSOK) {
					var data = res[CONST.RESDATA];
					this.parent.syncClientRecord(data);
				}
			},
			/**
			 * 更新数据记录之前的处理函数，主要负责确定回传的数据以及回传成功后的回调函数的合并
			 * @param  {object}   cfg 服务端数据配置项
			 * @param  {Function} cb  Controller里面的回调函数，主要和业务相关
			 * @return {[type]}       [description]
			 */
			beforeUpdate: function(cfg, cb, updateAll) {
				var success = null,
					me = this,
					postData = {};
				//判断是否全部更新还是部分更新
				if (updateAll) {
					postData = {
						"id": this.attributes.id,
						"updateType": "all",
						"data": this.attributes
					}
				} else {
					postData = {
						"id": this.attributes.id,
						"updateType": "partial",
						"data": getUpdateProperty(this)
					}
				}

				//合并配置项
				cfg.data ? (cfg.data["id"] = postData.id,
					cfg.data["updateType"] = postData.updateType,
					cfg.data["data"] = postData.data
				) : cfg.data = postData;

				//合并回调函数
				if (typeof cb === "function") {
					typeof cfg.success === "function" ? (success = cfg.success, cfg.success = function(data) {
						me.afterUpdate(res);
						success(data);
						cb(data);
					}) : cfg.success = function(res) {
						me.afterUpdate(res);
						cb(data);
					};
				} else {
					typeof cfg.success === "function" ? (success = cfg.success, cfg.success = function(data) {
						me.afterUpdate(res);
						success(data);
					}) : cfg.success = function(res) {
						me.afterUpdate(res);
					};
				}
				return cfg;
			},
			/**
			 * 更新数据记录
			 * @param  {Function} cb        回调函数
			 * @param  {Boolean}   updateAll 标记是否更新整个数据记录（false 表示只更新客户端修改以后的字段值）
			 * @return {[type]}             [description]
			 */
			update: function(cb, updateAll) {
				var cfg = this.remoteActions["update"],
					success = null;
				if (!type.isObject(cfg)) {
					throw new Error("config of update action not defined");
				}
				cfg = this.beforeUpdate(cfg, cb, updateAll);
				Ds.postJSON(cfg);
			},
			/**
			 * 更新成功后，调用客户端、服务端数据同步函数
			 * @param  {Object} res  服务端返回的数据
			 * @return {[type]}     [description]
			 */
			afterUpdate: function(res) {
				if (res[CONST.RESSTATUS] === CONST.RESSTATUSOK) {
					var data = res[CONST.RESDATA];
					this.parent.syncClientRecord(data);
				}
			},
			beforeRead: function(options) {
				return options;
			},
			/**
			 * 从服务端获取数据
			 * @param  {Function} cb [description]
			 * @return {[type]}      [description]
			 */
			read: function(cb) {
				var cfg = this.remoteActions["read"],
					success = null;
				if (!type.isObject(cfg)) {
					throw new Error("config of read action not defined");
				}
				cfg.data ? cfg.data["id"] = this.attributes.id : cfg.data = {
					id: this.attributes.id
				}
				cfg = this.beforeRead(mergeOpt(cfg, cb));
				Ds.postJSON(cfg);
			},
			beforeDelete: function(options) {
				return options;
			},
			remove: function(cb) {
				var cfg = this.remoteActions["remove"],
					success = null;
				if (!type.isObject(cfg)) {
					throw new Error("config of remove action not defined");
				}
				cfg.data ? cfg.data["id"] = this.attributes.id : cfg.data = {
					id: this.attributes.id
				}
				cfg = this.beforeDelete(mergeOpt(cfg, cb));
				Ds.postJSON(cfg);
			},

			execRemoteCmd: function(cmd, options) {

			}
		});
	Model.create = function(extend) {
		var fun = Model.extend(extend);
		fun.prototype.parent = fun;

		function getDataPubToView(dataBind, changedData) {
			var property = null,
				hasChange = false,
				result = {};
			//TODO:数据扁平化，暂时使用原生的‘.’做连接符，保持和数据绑定中的值一致。如果读取的时候有问题，则采用其他符号代替，然后在View中做符号替换处理
			for (var i in dataBind) {
				if (dataBind.hasOwnProperty(i)) {
					property = i;
					//检测i的格式，如果是单键绑定，直接从changedData中读取值，然后返回
					//
					//如果是多层级绑定，获取函数值
					//
					//如果绑定的字段在changedData里面找不到值，则说明没有变更
					//
					//
				}
			}
			hasChange ? "" : result = false;
			return result;
		}

		function getRemoteRecord(model, record, cb) {
			record.read(function(res) {
				if (res[CONST.RESSTATUS] === CONST.RESSTATUSOK) {
					var data = res[CONST.RESDATA];
					record.set(data);
					model.syncClientRecord(record);
					if (type.isFunction(cb)) {
						cb(record);
						record = null;
					}
				}
			})
		}
		//生成类方法
		fun.ext({
			records: {},
			/**
			 * 从Model中获取数据
			 * 如果是对数据一致性要求很高，则始终从服务端获取数据
			 * @param  {string}   rid 记录的ID
			 * @param  {Function} cb  获取记录成功后的回调函数
			 * @return {[type]}       [description]
			 */
			getRecord: function(rid, cb) {
				var record = null;
				if (CONST.DATASAFE) { //如果对数据一致性及安全性要求很高，则始终从服务端获取数据
					record = this.createRecord({
						id: rid
					});
					getRemoteRecord(this, record, cb);
					//检测是否
					record = null;
				} else {
					record = this.find(rid);
					if (type.isNull(record)) {
						record = this.createRecord({
							id: rid
						});
						getRemoteRecord(this, record, cb);
					} else {
						if (type.isFunction(cb)) {
							cb(record);
						}
						return record;
					}
				}
			},
			/**
			 * 获取客户端数据记录
			 * @param  {string} rid 记录对应的ID
			 * @return {[type]}     [description]
			 */
			getClientRecord: function(rid) {
				return this.find(rid);
			},
			/**
			 * 创建一个数据记录
			 * @param  {boolean} publishToView 内部调用参数，用来标记是否触发UI和Model之间的数据变更关联
			 * @return {[type]}               一条新的、空数据记录
			 */
			createRecord: function(data, publishToView) {
				var me = this,
					record = new this({
						parent: me,
						data: data
					});
				if (publishToView) {
					pubsub.publish(this.id + "View:CreateRecord", record);
				}
				return record;
			},
			/**
			 * 设置数据记录的字段值
			 * @param {string} rid           记录iD
			 * @param {string or Object} attr          属性名称  或  包含属性数据的对象
			 * 例如："name" 或者  "person.dept.name" 或 {person:{ dept:{id:"007",name:""},age:18}}
			 * @param {Any} val           属性的值 或 无
			 * @param {boolean} publishToView     内部调用参数，用来标记是否把数据变动通知给视图
			 */
			set: function(rid, attr, val, publishToView) {
				var record = this.find(rid),
					me = this,
					syncServerData,
					keyValue = true;
				if (type.isNull(record)) {
					return;
				}

				if (!type.isArray(record.changes)) {
					reocrd.changes = [];
				}
				//适用情况：set("rid","propertyName","propertyValue",publishToView)
				if (type.isString(attr) && arguments.length >= 3) {
					//TODO:需要处理多层级赋值的情况,例如 set("rid","person.dept.name","value of person's deptName",publishToView)
					keyValue = true;
					syncServerData = arguments[4];
					record.attributes[attr] = val;
					//如果同步服务端数据，则更新记录的原始值，确保原始值和数据记录一致
					if (syncServerData === true) {
						record.original[attr] = val;
					} else {
						checkChange(record, attr, val);
					}
					record.synced = false;
					if (publishToView === true) {
						publishToView(this.id + CONST.MRC, rid, attr, val, keyValue);
					}
					return record;
				}
				if (type.isObject(attr) && arguments.length >= 2) {
					keyValue = false;
					//适用情况：set("rid",{data:data}, publishToView);
					syncServerData = publishToView,
					publishToView = val;
					for (var i in attr) {
						if (attr.hasOwnProperty(i)) {
							record.attributes[i] = attr[i];
							if (syncServerData === true) {
								record.original[attr] = val;
							} else {
								checkChange(record, attr, val);
							}
						}
					}
					record.synced = false;

					if (publishToView === true) {
						var data = getDataPubToView(this.dataBind, attr);
						data !== false && publishToView(this.id + CONST.MRC, rid, data, null, keyValue);
					}
					return record;
				}
			},
			syncClientRecords: function(data) {
				var me = this,
					clientData = null,
					i = 0,
					r = null;
				if (type.isArray(data)) {
					for (; r = data[i]; i++) {
						clientData = this.records[r.id];
						//如果客户端没有缓存，则保存；如果已经缓存，则更新
						if (type.isNull(clientData) || type.isUndefined(clientData)) {
							this.records[r.id] = data;
						} else {
							me.syncClientRecord(r);
						}
					}
				}
			},
			/**
			 * 服务端数据和客户端缓存的数据同步
			 * @param  {Model or Object} data 要同步的服务端数据或者客户端数据记录
			 * @return {[type]}              [description]
			 */
			syncClientRecord: function(data) {
				var record = this.records[data.id];
				if (data instanceof this) {
					data = data.attributes;
				}
				//如果客户端没有缓存该记录，则创建一个数据记录，然后缓存
				if (type.isUndefined(record) || type.isNull(record)) {
					record = this.createRecord(data);
					this.records[record.id] = record;
				} else {
					//如果已经存在，则更新数据
					record.set(data, true);
				}
				record.changes = [];
				record.synced = true;
				record = null;
			},
			/**
			 * 获取客户端缓存的数据
			 * @param  {string} id 数据记录的ID
			 * @return {[type]}    [description]
			 */
			find: function(id) {
				var rcd = this.records[i];
				if (type.isNull(rcd) || type.isUndefined(rcd)) {
					return null;
				}
				if (rcd instanceof Model) {
					return rcd;
				} else {
					return this.createRecord(rcd);
				}
			},
			beforeList: function(cfg, cb) {
				var success = null,
					me = this;
				if (typeof cb === "function") {
					typeof cfg.success === "function" ? (success = cfg.success, cfg.success = function(data) {
						me.afterList(res);
						success(data);
						cb(data);
					}) : cfg.success = function(res) {
						me.afterList(res);
						cb(data);
					};
				} else {
					typeof cfg.success === "function" ? (success = cfg.success, cfg.success = function(data) {
						me.afterList(res);
						success(data);
					}) : cfg.success = function(res) {
						me.afterList(res);
					};
				}
				return cfg;
			},
			list: function(options, cb) {
				var cfg = $.extend(this.prototype.remoteActions["list"], options),
					success = null;
				if (!type.isObject(cfg)) {
					throw new Error("config of list action not defined");
				}
				cfg = this.beforeList(cfg, cb);
				Ds.postJSON(cfg);
			},
			afterList: function() {
				if (res[CONST.RESSTATUS] === CONST.RESSTATUSOK) {
					var data = res[CONST.RESDATA];
					this.syncClientRecords(data);
					//对外公布数据获取信息，渲染列表
				}
			},
			stringify: function() {

			},
			toJSON: function() {

			},
			saveLocal: function() {

			},
			loadLocal: function() {

			},
			loadRemote: function() {

			}
		})
		return fun;
	}
	//将model原有的继承方式改为创建方式，有别于其他类的继承
	//Model.extend = Model.create;
	return Model;
})