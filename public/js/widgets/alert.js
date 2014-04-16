define(['./floatbox'], function(Box) {
	var instance = null,
		alert = {
			title: '<h3 class="confirm-title hook-title">消息</h3>',
			content: '<div class="confirm-conent hook-content"></div>',
			footer: '<button type="button" class="btn btn-primary hook-ok">确定</button>'
		};
	return {
		getInstance: function() {
			if (instance === null) {
				instance = new Box(alert);
				instance.show = function(msg, title, callback) {
					if (arguments.length == 2) {
						if (typeof title === "function") {
							callback = title,
							title = "";
						}
					}
					typeof callback === "function" && (this.onOK = cb);
					title && this.elem.find(".hook-title").html(title);
					msg && this.elem.find(".hook-content").html(msg);
					this._super();
				}
			}
			return instance;
		}
	}
})