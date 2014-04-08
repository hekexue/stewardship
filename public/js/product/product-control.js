define(["./product-view", "./product-model", "../common/Controller", "../lib/PubSub"], function(UI, Model, Controller, pubsub) {
	var product = Controller.extend({
		View: UI.getInstance(),
		Model: Model,
		id: "product",
		afterShow: function() {
			this.Model.list({}, function(data) {
				this.View.renderList(data);
			});
		}
	});
	return product;
})