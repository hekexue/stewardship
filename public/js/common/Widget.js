define(['jquery', './ClassBase', './Template', '../lib/Type'], function($, Class, TP, type) {
	var Widget = Class.extend({
		init: function(options) {
			//this._super();
			this.options = options || {};
			this.template = this.template ? this.template : options.template;
			this.rendered = false;
			this.elem = this.options.elem || null;
			if (this.elem === null && !this.template) {
				throw new Error("A Widget need the template option");
			}
			this.render();
		},
		beforeRender: function() {
			return {};
		},
		render: function() {
			var data = this.beforeRender();
			if (this.elem === null) {
				this.elem = $(TP.tmpl(this.template, data));
			} else if (type.isHtml(this.elem) || type.isString(this.elem)) {
				this.elem = $(this.elem);
			}
			this.afterRender(this.elem);
		},
		afterRender: function(elem) {
			this.bindEvent(elem);
		},
		bindEvent: function(elem) {

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
				this.parentEl = parentEl;
				this.rendered = true;
			}
			this.elem.show();
		},
		hide: function(destory) {
			this.elem.hide();
			if (destory === true) {
				this.rendered = false;
				this.elem.unbind();
				this.elem.undelegate();
				this.elem.remove();
				this.elem = null;
			}
		}
	})
	return Widget;
})