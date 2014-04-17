define(['jquery', '../common/Widget'], function($, Widget) {
	var boxHtml = [
		'<div class="modal" data-backdrop="static">',
		' <div class="modal-dialog">',
		'   <div class="modal-content">',
		'     <div class="modal-header">',
		'       <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
		'       <h4 class="modal-title"><%=title%></h4>',
		'     </div>',
		'     <div class="modal-body">',
		'       <%=content%>',
		'     </div>',
		'     <div class="modal-footer">',
		'		<%=footer%>',
		'     </div>',
		'   </div>',
		' </div>',
		'</div>'
	].join(''),
		FloatBox = Widget.extend({
			init: function(options) {
				this.template = options.template = boxHtml;
				this.renderData = $.extend({
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
				this.elem.modal();
			},
			hide: function(destroy) {
				this.elem.modal("hide");
			}
		});
	return FloatBox;
})