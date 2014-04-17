define(['jquery', '../common/Widget'], function($, Widget) {
	var clsArray = ["alert-success", "alert-info", "alert-warning", "alert-danger"],
		Info = Widget.extend({
			template: '<div class="alert alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><div id="infoMsg" class="text-center"></div></div>',
			show: function(msg, type) {

				this._super();
				var cls = "",
					me = this,
					width = this.parentEl.width();
				switch (type) {
					case "success":
						cls = "alert-success";
						break;
					case "info":
						cls = "alert-info";
						break;
					case "warning":
						cls = "alert-warning";
						break;
					case "error":
						cls = "alert-danger";
						break;
					default:
						cls = "alert-success";
				}
				this.elem.removeClass(function() {
					return clsArray.join(" ");
				}).addClass(cls).css({
					"position": "absolute",
					"width": width,
					"top": 0,
					"left": 0
				}).find("#infoMsg").html(msg);
				setTimeout(function() {
					me.hide();
				}, 4000)
			}
		}),
		instance = null;
	return {
		getInstance: function() {
			if (instance === null) {
				instance = new Info();
			}
			return instance;
		}
	}
})