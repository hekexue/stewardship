define(["jquery", "./company/controller", "./company/model", "./company/view"], function($, Controller, Model, View) {
	function init() {
		var controller = Conttoller.getInstance({

		});
		controller.active();
	}
	return {
		init: function() {
			init();
		}
	}
})