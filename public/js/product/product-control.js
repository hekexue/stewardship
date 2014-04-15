define(["./product-view", "./product-model", "../common/Controller", "../lib/PubSub"], function(UI, Model, Controller, pubsub) {
	var Product = Controller.extend({
		getRecordByEvt:function(e){
			var id = this.View.getRecordIdByEvt(e),
			record = this.Model.getClientRecord(id);
			return record;
		},
		afterShow: function() {
			var me = this;
			this.Model.list({}, function(res) {
				if (res._r_ == "ok") {
					me.View.renderList(res);
				} else {
					me.View.error(res._r_);
				}
			});
		}
	}),
		options = {
			id: "product",
			View: UI.getInstance(),
			Model: Model,
			events: {
				"#btnSaveRecord click": "onSave"
			}
		},
		instance = null;
	return {
		getInstance: function() {
			if (instance === null) {
				instance = new Product(options);
			}
			return instance;
		}
	}

})