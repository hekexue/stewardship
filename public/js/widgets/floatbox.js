define(['jquery', '../common/Widget'], function($, Widget) {
	var boxHtml = [
		'<div class="modal fade">',
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
		'   </div><!-- /.modal-content -->',
		' </div><!-- /.modal-dialog -->',
		'</div><!-- /.modal -->'
	].join(''),
		FloatBox = Widget.extend({
			init: function(options) {
				this.template = boxHtml;
				this._super(options);
				this.renderData = $.extend({
					title: "",
					content: "",
					footer: '<button type="button" class="btn btn-primary hook-ok">确定</button><button type="button" class="btn btn-default hook-cancel" data-dismiss="modal">取消</button>'
				}, options);
			},
			beforeRender: function() {
				return this.renderData;
			},
			bindEvent: function() {
				var me = this;
				this.elem.delegate(".hook-ok", 'click', function() {
					if (typeof me.onOk === 'function') {
						me.onOk();
					} else {
						me.hide();
					}
				});
				this.elem.delegate('.hook-cancel', 'click', function() {
					if (typeof me.onCancel === 'function') {
						me.onCancel();
					} else {
						me.hide();
					}
				})
			},
			show: function() {
				this._super();
				this.elem.modal();
			},
			hide: function(destory) {
				this.elem.modal("hide");
				this._super(destory);
			}
		});
	return FloatBox;
})