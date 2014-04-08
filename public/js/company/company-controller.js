define(["./company-view", "company-model", "./controller", "../lib/pubsub"], function(UI, Model, Controller, pubsub) {
	var company = Controller.extend({
		View: UI.getInstance(),
		Model: Model,
		id: "company",
		afterShow: function(data) {
			this.Model.list({}, function(data) {
				this.View.renderList(data);
			});
		}
	});
	return company;
})