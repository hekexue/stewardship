define(["./product-view", "./product-model", "../common/Controller", "../lib/PubSub"], function(UI, Model, Controller, pubsub) {
	var product = Controller.extend({
		View: UI.getInstance(),
		Model: Model,
		id: "product",
		afterShow: function() {
			var me = this;
			this.Model.list({}, function(res) {		
				if(res._r_=="ok"){
					me.View.renderList(res);
				}else{
					me.View.error(res._r_);
				}
			});
		}
	});
	return product;
})