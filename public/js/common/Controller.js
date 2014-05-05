define(['jquery', '../lib/PubSub', '../lib/Event', '../lib/Type', './CONST'], function($, pubSub, evt, type, cst) {
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

		pubsub.on(instance.id + CONST.VRC, function(id, attr, val, publishToModel) {
			var publishToView = false;
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
			instance.View.parent.onRecordChange(id, attr, val, publishToModel, type);
		});
		pubsub.on(instance.id + CONST.MRA, function(record) {
			instance.View.parent.onRecordAdd(record);
		});
		// // pubSub.on(instance.id + "Model:RecordAdd", function(record) {
		// //	instance.View.onRecordAdd(record, false);
		// // });
		// pubSub.on(instance.id + "Model:RecordRemove", function(record) {
		//	instance.View.onRecordRmv(record, false);
		// });
	}
	//TODO:需要修改所有的before　和　after事件，将其空出来以便真正的业务控件复写，同时对外发布消息，提供服务端返回的数据
	var pubsub = pubSub.getInstance(),
		Controller = evt.extend({
			actived: false,
			init: function(options) {
				options ? "" : options = {};
				this.options = options || {};
				this._super(options);
				if (!options.id && !this.id) {
					throw new Error("need an id for the controller");
				}
				this.id = this.id ? this.id : this.options.id;
				this.View = this.View ? this.View : this.options.View;
				this.Model = this.Model ? this.Model : this.options.Model;
				this.pubsub = pubSub.getInstance();
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
				//if (this.options.View && this.options.Model) {


				//if (type.isObject(this.options.bindData)) {
				//this.Model.bindData = this.options.bindData;
				initPubSubs(this);
				//}
				//}
			},
			getEvtName: function(name) {
				return this.id + name;
			},
			beforeRender: function(data, next) {
				//changeData 
				next(data);
			},
			render: function(data) {
				var me = this;
				this.beforeRender(data, function(data) {
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
				var me = this,
					evts = this.options.events,
					keys = [],
					evtName = "",
					selector = "",
					handler;
				for (var i in evts) {
					keys = i.split(" ");
					selector = keys[0],
					evtName = keys[1];
					handler = this[evts[i]];
					this.View.elem.delegate(selector, evtName, function(handler) {
						return function(e) {
							handler.call(me, e);
						}
					}(handler))
				}
			},
			getRecordForm: function() {
				throw new Error("返回数据视图或者数据表单");
			},
			getDefaultData: function() {
				return {};
			},
			getFiledValue: function(record, keyfield) {
				var keys = [],
					value;
				if (keyfield.indexOf(".") > 0) {
					keys = keyfield.split(".");
				} else {
					keys.push(keyfield);
				}

				for (var i = 0, k = ""; k = keys[i]; i++) {
					value = record[k];
					if (value === undefined || value === null) {
						return null;
					}
					record = value;
				}
				return value;
			},
			/**
			 * 数据和视图绑定
			 * @param  {String||JQuery Object} view   要绑定数据的视图
			 * @param  {Model Instance} record 单条数据记录
			 * @return {[type]}        [description]
			 */
			_bind: function(view, record) {
				var tmpView = "",
					me = this;
				//获取视图中的控件
				if (type.isString(view)) {
					view = $(view);
					tmpView = view.clone();
				}
				//搜索绑定控件及属性标记
				tmpView.find("[data-bind]").each(function(index, domEle) {
					//根据不同元素的类型，进行不同形式的赋值：需要考虑到1普通输入框，2checkbox，3radio button ，4select，5普通dom元素
					var dom = $(domEle),
						field = dom.attr("data-bind");
					switch (dom.attr("type").toLowerCase()) {
						case "text":
						case "textarea":
							dom.val(me.getFiledValue(record.attributes, field))
							break;
					}
				})
				tmpView.find("form").attr("data-id", record.id);
				view.replaceWith(tmpView);

			},
			beforeActive: function(next) {
				if (this.inited === false) {
					var defaultData = this.options.defaultData || this.getDefaultData() || {};
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
				this.View.showAdd(record);
				this.afterAdd();
			},
			afterAdd: function() {

			},
			beforeEdit: function(rid, next) {
				if (rid && rid.length > 0) {
					this.Model.getRecord(rid, next);
				} else {
					this.setRouter("");
				}
			},
			onEdit: function(e) {
				var me = this,
					rid = "";
				if (e === null) {
					rid = arguments[1];
				} else {
					rid = this.getRecordIdByEvt(e);
				}

				this.beforeEdit(rid, function(record) {
					//bind data to View , the View state should be "edit"
					me.View.showEdit(record);
					me._bind(me.getRecordForm(), record);
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
					record = this.getRecordByEvt(e);
				this.beforeSave(record, function(recd) {
					recd.save(me.proxy(me.afterSave, me, recd));
				})
			},
			getRecordIdByEvt: function(e) {
				throw new Error("need to overwrite this function");
			},
			getRecordByEvt: function(e) {
				throw new Error("need to overwrite this function");
			},
			afterSave: function(record, res) {
				throw new Error("need to overwrite this  the 'afterSave' method");
			},
			beforeUpdate: function(record, next) {
				var msg = record.validCheck();
				if (msg === true) {
					next(record);
				} else {
					this.View.error(msg);
				}
			},
			update: function(record, updateAll) {
				var me = this;
				this.beforeUpdate(record, function(record) {
					record.update(me.proxy(me.afterUpdate, me, reocrd), updateAll);
				});
			},
			afterUpdate: function(record, res) {
				if (res[CONST.RESSTATUS] === CONST.RESSTATUSOK) {
					this.View.msg("更新成功");
					this.View.afterUpdateRecord(record);
				} else {

				}
			},
			beforeRemove: function(rid, next) {
				var local = true,
					record = this.Model.getClientRecord(rid);
				if ( !! record) {
					this.View.confirm("删除", "确定要移除" + record.attributes.name + "记录吗 ? ", function(e) {
						next(e, record);
					});
				}
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
					this.View.afterRemoveRecord(record);
				} else {
					this.View.msg("删除失败", "error");
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
				var me = this;
				this.beforeShow(function() {
					me.View.show.apply(me.View, arguments);
					me.afterShow.apply(me, arguments);
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

			},
			setRouter: function(route) {
				if (type.isString(route)) {
					window.location.hash = route;
				}
			},
			resetRouter: function() {
				this.pubsub.publish("resetRouter");
			}
		});
	Controller.CONST = CONST;
	return Controller;
})