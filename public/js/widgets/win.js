define(['jquery', '../common/Widget'], function($, Widget) {
	var boxHtml = [
		'<div class="modal" data-backdrop="static">',
		' <div class="modal-dialog">',
		'   <div class="modal-content">',
		'     <div class="modal-header">',
		'       <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
		'       <h4 class="modal-title"><h3 class="win-title hook-title">消息</h3></h4>',
		'     </div>',
		'     <div class="modal-body">',
		'       <div class="win-conent hook-content"></div>',
		'     </div>',
		'     <div class="modal-footer">',
		'		<div class="win-footer hook-footer"></div>',
		'     </div>',
		'   </div>',
		' </div>',
		'</div>'
	].join(''),
		FloatBox = Widget.extend({
			init: function(options) {
				this.template = this.template ? this.template : boxHtml;
				this.renderData = this.renderData ? this.renderData : $.extend({
					title: "",
					content: "",
					footer: '<button type="button" class="btn btn-primary hook-ok">确定</button><button type="button" class="btn btn-default hook-cancel" data-dismiss="modal">取消</button>'
				}, options);
				this._super(options);
			},
			beforeRender: function() {
				return this.renderData;
			},
			bindEvent: function() {
				var me = this;
				this.elem.delegate(".hook-ok", 'click', me.proxy(me.onOK, me));
				this.elem.delegate('.hook-cancel', 'click', me.proxy(me.onCancel, me));
			},
			onOK: function(e) {
				this.hide();
			},
			onCancel: function(e) {
				this.hide();
			},
			show: function(config) {
				var parentEl = null;
				!config && (config = {});
				var title = config.title,
				msg = config.msg,
				footer = config.footer;
				if (!this.rendered) {
					if (!this.options.parentEl) {
						parentEl = $("body");
					} else {
						parentEl = $(this.options.parentEl);
					}
					parentEl.append(this.elem);
					this.rendered = true;
				}
				title && this.elem.find(".hook-title").html(title);
				msg && this.elem.find(".hook-content").html(msg);
				footer && this.elem.find(".hook-footer").html(footer);
				this.elem.modal();
			},
			hide: function(destroy) {
				this.elem.modal("hide");
			}
		});
	return FloatBox;
})