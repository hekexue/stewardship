define(["./ui", "./model", "./controller", "../lib/pubsub"], function(ui, model, Controller, pubsub) {
	var company = Controller.extend({
		afterShow: function() {
			this.Model.loadRemote();
		}
	});
	return company;
})