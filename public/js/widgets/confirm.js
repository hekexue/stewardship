define(['./floatbox'], function(Box) {
	var instance = null,
		confirm = {
			title: '<h3 class="confirm-title hook-title">确认</h3>',
			content: '<div class="confirm-conent hook-content"></div>'
		};
	return {
		getInstance: function() {
			if (instance === null) {
				instance = new Box(confirm);
				instance.show = function(options) {
					!options && (options = {});
					var msg = options.msg,
						title = options.title,
						cb = options.callback;
					this.onOK = cb;
					this.elem.find(".hook-title").html(title);
					this.elem.find(".hook-content").html(msg);
					this._super();
				}
			}
			return instance;
		}
	}
})