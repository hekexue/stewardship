define(['jquery', '../lib/pubSub', '../lib/Event', '../lib/Type', './CONST'], function($, pubSub, evt, type, cst) {
	/**
	 * Controller实例，在初始化的时候，可以传递一个模板，或者传递一个elem 或者传递一个 css选择器
	 * 如果传递了elem，则优先使用elem作为对象，
	 * 如果传递了选择器，则在初始化UI的时候，使用选择器来初始化
	 */
	var CONST = cst;

	function optionCheck(options) {
		if (!type.isObject(options)) {
			return "a view need a config option praram";
		}
		if (!type.isString(options.id)) {
			return "a view instance need a id property";
		}
		// if (!type.isString(options.tmpl)) {
		//	return "a view instance need an 'tmpl' property which should be a template string used for data rendering";
		// }
		// if (!options.parentEl) {
		//	return "a view instance need an 'parentEl' "
		// }
		return true;
	}

	function initPubSubs(instance) {
		pubsub.on(instance.id + CONST.VRR, function(id, attr, val, publishToModel) {
			publishToModel && instance.Model.set(id, attr, val, publishToView);
		});


		// //client-side data binding
		// pubsub.on(instance.id + "View:RecordChange", function(id, attr, val) {
		//	instance.Model.set(id, attr, val, false);
		// });
		// // pubsub.on(instance.id + "View:RecordAdd", function(record) {
		// //	instance.Model.add(record, false);
		// // });
		pubsub.on(instance.id + CONST.VRR, instance.onRemove);

		pubsub.on(instance.id + CONST.MRC, function(id, attr, val, type) {
			var publishToModel = false;
			instance.View.onRecordChange(id, attr, val, publishToModel, type);
		});
		// // pubSub.on(instance.id + "Model:RecordAdd", function(record) {
		// //	instance.View.onRecordAdd(record, false);
		// // });
		// pubSub.on(instance.id + "Model:RecordRemove", function(record) {
		//	instance.View.onRecordRmv(record, false);
		// });
	}

	var pub = pubSub.getInstance(),
		Controller = evt.extend({
			init: function(options) {
				this._super(options);
				if (!options.id) {
					throw new Error("need an id for the controller");
				}
				this.pubsub = pubSub.getInstance();
				this.options = options || {};
				/*
				此处应该使用脚本内的资源，例如	i18n资源或者其他一些默认的文字资源、数据资源等，而不应该使用服务端数据
				在此处使用服务端数据，会阻塞视图的渲染。最佳方案应该给用户显示一个默认界面，提示正在加载数据，要好过
				等待服务端数据返回以后再渲染界面
				 */
				this.defaultData = this.options.defaultData || null;
				this.inited = false;
				if (this.options.selfActive) {
					this.active();
					this.inited = true;
				}
				if (this.options.View && this.options.Model) {
					this.View = this.options.View;
					this.Model = this.options.Model;

					if (type.isObject(this.options.bindData)) {
						this.Model.bindData = this.options.bindData;
						initPubSubs(Model, View);
					}
				}
			},
			getEvtName: function(name) {
				return this.id + name;
			},
			beforeRender: function(next) {
				//getData
				next(data);
			},
			render: function(data) {
				var me = this;
				this.beforeRender(function(data) {
					me.View.render(data);
					me.afterRender.apply(me, arguments);
				});
			},
			afterRender: function() {

			},
			initUI: function(defaultData, show) {
				this.render(defaultData);
				if (show) {
					this.show();
				}
			},
			initEvent: function() {
				var evts = this.options.events,
					keys = [],
					evtName = "",
					selector = "",
					handler;
				for (var i in evts) {
					keys = i.split(" ");
					selector = keys[0],
					evtName = keys[1];
					handler = this[evts[i]];
					this.View.elem.delegate(selector, evtName, this.proxy(handler));
				}
			},
			beforeActive: function(next) {
				if (this.inited === false) {
					var defaultData = options.defaultData || this.getDefaultData() || {};
					this.initUI(defaultData);
					//如果controller定义了路由，则使用路由规则作为事件驱动，如果没有定义路由规则，则使用controller本身的事件来驱动
					if (!this.options.routes) {
						this.initEvent();
					}
				}
				next();
			},
			active: function() {
				if (this.actived === false) {
					var me = this;
					this.beforeActive(function() {
						me.actived = true;
						me.show();
					})
				}
			},

			onDeactive: function() {

			},

			beforeAdd: function() {
				var record = this.Model.createRecord(true);
				return record;
			},
			onAdd: function() {
				var record = this.beforeAdd();
				//bind View, the view state should be "add"
				this.View.showAdd();
				this.afterAdd();
			},
			afterAdd: function() {

			},
			beforeEdit: function(rid, next) {
				this.Model.getRecord(rid, next);
			},
			onEdit: function(e) {
				var me = this,
					rid = this.getRecordIdByEvt(e);
				this.beforeEdit(rid, function(record) {
					//bind data to View , the View state should be "edit"
					me.View.showEdit(record);
					me.afterEdit();
				});
			},
			afterEdit: function() {

			},
			beforeSave: function(record, next) {
				var msg = record.validCheck();
				if (msg === true) {
					next(record);
				} else {
					this.View.error(msg);
				}
			},
			onSave: function(e) {
				var me = this,
					record = this.getRecordByEvt();
				this.beforeSave(record, function(recd) {
					recd.save(me.proxy(me.afterSave, me, recd));
				})
			},
			afterSave: function(record, res) {
				if (res[CONST.RESSTATUS] === CONST.RESSTATUSOK) {
					this.View.msg("添加成功");
					this.View.afterSaveRecord(record);
				} else {
					this.View.error(res[CONST.RESSTATUS]);
				}
			},
			beforeUpdate: function(record, next) {
				var msg = record.validCheck();
				if (msg === true) {
					next(record);
				} else {
					this.View.error(msg);
				}
			},
			update: function(record) {
				var me = this;
				this.beforeUpdate(record, function(record) {
					record.update(me.proxy(me.afterUpdate, me, reocrd));
				});
			},
			afterUpdate: function(record, res) {
				if (res[CONST.RESSTATUS] === CONST.RESSTATUSOK) {
					this.View.msg("更新成功");
					this.View.onUpdateRecord(record);
				} else {

				}
			},
			beforeRemove: function(rid, next) {
				var local = true,
					record = this.Model.getRecord(rid, local);
				//confirm remove or not 
				this.View.confirm("确定要移除" + record.id + "记录吗 ? ", function(e) {
					next(e, record);
				});
			},
			onRemove: function(e) {
				var rid = this.getRecordIdByEvt(e),
					me = this;
				this.beforeRemove(rid, function(res, record) {
					if (res === true) {
						record.remove(me.proxy(me.afterRemove, me, record));
					}
				})
			},

			afterRemove: function(record, res) {
				if (res[CONST.RESSTATUS] === CONST.RESSTATUSOK) {
					// pubSub.publish(this.getEvtName("msg"), "移除成功");				
					// pubSub.publish(this.id + "Model:RecordRemove", record);
					this.View.msg("移除成功");
					this.View.onRecordRemove(record);
				} else {

				}
			},
			beforeList: function(next) {
				next();
			},
			onList: function() {
				var me = this;
				this.beforeList(function() {
					me.Model.list(me.proxy(me.afterList, me));
				});
			},
			afterList: function(res) {

			},
			beforeShow: function(next) {
				next();
			},
			show: function() {
				this.beforeShow(function() {
					me.View.show.apply(me.View, arguments);
					me.afterShow.apply(me.View, arguments);
				})
			},
			afterShow: function() {

			},
			beforeHide: function(next) {
				next();
			},
			hide: function(destroy) {
				var me = this;
				this.beforeHide(function() {
					me.View.hide.apply(me.View, arguments);
					me.afterHide.apply(me, arguments);
				})
			},
			afterHide: function() {

			}
		});
	return Controller;
})