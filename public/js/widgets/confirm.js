define(['./floatbox'], function(Box) {
	var instance = null,
		Confirm = Box.extend({
			onOK: function(e) {
				var cb = this.cb;
				if (typeof cb === "function") {
					cb(true);
				}
				this._super();
			},
			onCancel: function(e) {
				var cb = this.cb;
				if (typeof cb === "function") {
					cb(false);
				}
				this._super();
			},
			show: function(options) {
				!options && (options = {});
				var msg = options.msg,
					title = options.title,
					cb = options.callback;
				this.cb = cb;
				this.elem.find(".hook-title").html(title);
				this.elem.find(".hook-content").html(msg);
				this._super();
			}
		}),

		args = {
			title: '<h3 class="confirm-title hook-title">确认</h3>',
			content: '<div class="confirm-conent hook-content"></div>'
		};
	return {
		getInstance: function() {
			if (instance === null) {
				instance = new Confirm(args);
			}
			return instance;
		}
	}
})