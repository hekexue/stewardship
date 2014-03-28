define(['jquery', '../lib/PubSub', '../lib/Event', '../lib/Type', './Template'], function($, pubSub, evt, type, Template) {
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
	var pub = pubSub.getInstance(),
		View = evt.extend({
			init: function(options) {
				var ckres = optionCheck(options);
				if (ckres !== true) {
					throw new Error(ckres);
				}
				this._super();
				this.options = options;
				this.initEvent();
				this.rendered = false;
			},
			initUI: function() {
				type.isDom(this.options.elem) || type.isObject(this.options.elem) ? this.elem = this.options.elem : (this.elem = null);
			},
			initEvent: function() {
				this.elem.delegate("change", function(e) {
					//监听表单字段的变更，将结果对外广播
					var target = $(e.target),
						attr = target.attr("data-bind"),
						val = target.val(),
						id = instance.getRecordIdByEvt(e),
						publishToModel = this.parent.publishToModel;
					pubsub.publish("", id, attr, val, publishToModel);
					this.parent.publishToModel = true;
				})
			},
			getRecordIdByEvt: function(e) {

			},
			onActive: function() {

			},
			onDeactive: function() {

			},
			render: function(data) {
				var elem = $(Tmpl.tmpl(this.options.template, data));
				if (type.isNull(this.elem)) {
					this.elem = elem;
				}
				this.afterRender();
			},
			afterRender: function() {
				this.initEvent();
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
			}
		});
	//定义类方法
	View.create = function(extend) {
		var fun = View.extend(extend);
		fun.prototype.parent = fun;

		function getDomId(view, dataId) {
			return view.id + view.type + dataId;
		}
		//生成类方法
		fun.ext({
			publishToModel: true,
			onRecordChange: function(id, attr, val, publishToModel, single) {
				//使用代码改变数据的时候，界面更新，同时，数据变更不再通知给Model
				//TODO:当前这种处理方式，只支持单键数据绑定，如果要支持类似于 'data-bind:person.dept.name'需要再写代码做处理
				//方案有两种，在返回的数据中，将json结构数据扁平化；另外一种
				var dom = this.elem.find(getDomId(this, id));
				this.publishToModel = publishToModel;
				if (single === true) {
					dom.find("[data-bind=" + attr + "]").val(val);
				} else {
					for (var i in attr) {
						dom.find("[data-bind=" + i + "]").val(attr[i]);
					}
				}
			},
			onUpdateRecord: function(id, attr, val, publishToModel) {
				//数据记录更新以后，
			},
			onRecordRemove: function(record) {
				//
			}
		});
		return fun;
	}
	return view;
})