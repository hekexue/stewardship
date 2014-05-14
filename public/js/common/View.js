define(['jquery', 'bootstrap', '../lib/PubSub', '../lib/Event', '../lib/Type', './Template', './CONST', '../widgets/messageBox', '../widgets/confirm', '../widgets/info', '../widgets/win'], function($, boot, pubSub, evt, type, Tmpl, CONST, MessageBox, Confirm, Info, Win) {
	/**
	 * 视图实例，在初始化的时候，可以传递一个模板，或者传递一个elem 或者传递一个 css选择器
	 * 如果传递了elem，则优先使用elem作为对象，
	 * 如果传递了选择器，则在初始化UI的时候，使用选择器来初始化
	 */

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

	/*全局监听表单变化*/
	$(document).delegate("[data-bind]", "change", function(e) {
		var form = $(e.target).closest("[data-model]"),
			change = form.attr("data-change"),
			model = form.closest("[data-model]").attr("data-model");
		if (change || change === undefined) {
			//监听表单字段的变更，将结果对外广播
			var target = $(e.target),
				attr = target.attr("data-bind"),
				id = form.attr("data-id"),
				val = target.val();
			pubsub.publish(model + CONST.VRC, id, attr, val, true);
		}
	})

	var pubsub = pubSub.getInstance(),
		messageBox = MessageBox.getInstance(),
		confirm = Confirm.getInstance(),
		info = Info.getInstance(),
		View = evt.extend({
			init: function(options) {
				this.options = this.options ? this.options : options || {};
				var ckres = optionCheck(this.options);

				if (ckres !== true) {
					throw new Error(ckres);
				}
				this._super(this.options);
				this.id = this.options.id;
				//this.initEvent();
				this.rendered = false;
			},
			initUI: function() {
				type.isDom(this.options.elem) || type.isObject(this.options.elem) ? this.parent.elem = this.elem = this.options.elem : (this.elem = null);
			},
			initEvent: function() {
				var me = this;
				if (this.elem) {
					this.elem.on("change", function(e) {
						var form = $(e.target).closest("[data-model]"),
							model = form.attr("data-model");
						if (model === this.id) {
							//监听表单字段的变更，将结果对外广播
							var target = $(e.target),
								attr = target.attr("data-bind"),
								val = target.val(),
								id = me.getRecordIdByEvt(e),
								publishToModel = me.parent.publishToModel;
							pubsub.publish(me.id + CONST.VRC, id, attr, val, publishToModel);
							me.parent.publishToModel = true;
							form.attr("data-change", true);
						}
					})
				}
			},
			getRecordIdByEvt: function(e) {
				throw new Error("需要对该方法做继承");
			},
			onActive: function() {

			},
			onDeactive: function() {

			},
			render: function(data) {
				var elem = $(Tmpl.tmpl(this.options.template, data));
				if (!type.isExist(this.elem)) {
					this.parent.elem = this.elem = elem;
				}
				this.afterRender();
			},
			renderEl: function(tmpl, data) {
				var elContainer = "",
					replace = true,
					renderMethod = "",
					el = null;
				if (arguments.length === 2) {
					return $(Tmpl.tmpl(tmpl, data));
				}
				elContainer = arguments[2];
				renderMethod = arguments[3];
				el = $(Tmpl.tmpl(tmpl, data));
				if (type.isDom(elContainer) || type.isString(elContainer)) {
					elContainer = $(elContainer);
				}
				if (type.isObject(elContainer) && elContainer instanceof $) {
					if (renderMethod) {
						elContainer[renderMethod](el);
					} else {
						elContainer.append(el);
					}
				}
				return el;
			},
			afterRender: function() {
				this.initEvent();
			},
			showAdd: function() {
				throw new Error("需要继承showAdd方法");
			},
			showEdit: function() {
				throw new Error("需要继承showEdit方法");
			},
			afterSaveRecord: function() {
				throw new Error("需要继承afterSaveRecord方法");
			},
			afterUpdateRecord: function() {
				throw new Error("需要继承afterUpdateRecord方法");
			},
			afterRemoveRecord: function(record) {
				$("#" + record.attributes._id).remove();
				//throw new Error("需要继承afterRemoveRecord方法")
			},
			show: function() {
				var parentEl = null;
				if (!this.rendered) {
					if (!this.options.parentEl) {
						parentEl = $("body");
					} else {
						parentEl = $(this.options.parentEl);
					}
					parentEl.append(this.elem);
					this.rendered = true;
				}
				this.elem.show();
			},
			hide: function(destroy) {
				if (destroy === true) {
					this.elem.unbind();
					this.elem.undelegate();
					this.elem.remove();
					//this.rendered = false;
				} else {
					this.elem.hide();
				}
			},
			msg: function(msg) {
				info.show(msg);
			},
			error: function(msg) {
				info.show(msg, "error");
			},
			confirm: function(title, msg, cb) {
				confirm.show({
					title: title,
					msg: msg,
					callback: cb
				});
			},
			win: function(options, newInstance) {
				if (newInstance === true) {
					var win = new Win();
					win.show(options);
					return win;
				} else {
					if (!this.Window) {
						this.Window = new Win();
					}
					this.Window.show(options);
				}
			},
			hideWin: function(win) {
				if (win) {
					win.hide();
					win = null;
				} else {
					this.Window.hide();
				}
			}
		});
	//定义类方法
	View.create = function(extend) {
		var fun = View.extend(extend);
		fun.prototype.parent = fun;

		function getDomId(view, dataId) {
			return view.id + "-" + view.type + "-" + dataId;
		}
		//生成类方法
		fun.ext({
			publishToModel: true,
			onRecordChange: function(id, attr, val, publishToModel, single) {
				//使用代码改变数据的时候，界面更新，同时，数据变更不再通知给Model
				//TODO:当前这种处理方式，只支持单键数据绑定，如果要支持类似于 'data-bind:person.dept.name'需要再写代码做处理
				//方案有两种，在返回的数据中，将json结构数据扁平化；另外一种
				var dom = this.elem.find("#" + getDomId(this, id));
				this.publishToModel = publishToModel;
				dom.attr("data-change", publishToModel || false);
				if (single === true) {
					dom.find("[data-bind=" + attr + "]").val(val);
				} else {
					for (var i in attr) {
						dom.find("[data-bind=" + i + "]").val(attr[i]);
					}
				}
			},
			onRecordAdd: function(record) {

			}
		});
		return fun;
	}
	return View;
})