define(["jquery", "../common/View", "./product-template"], function($, View, tmpl) {
	var ProductView = View.create({
		options: {
			id: "product",
			parentEl: "#mainView",
			template: tmpl.defaultView()
		},
		showAdd: function(record) {
			var win = "";
			if (!this.addWinInited) {
				this.addWinInited = true;
				this.renderEl(tmpl.add(), record, "body", "append");
			}
			$("#stewradshipWindow").show();
		},
		showEdit: function(record) {
			var win = "";
			if (!this.addWinInited) {
				this.addWinInited = true;
				this.renderEl(tmpl.record(), record, "#recordForm", "replace");
			}
			$("#stewradshipWindow").show();
		},
		afterSaveRecord: function() {
			$("#stewradshipWindow").hide();
		},
		afterUpdateRecord: function(record) {
			$("#stewradshipWindow").hide();
		},
		renderList: function(data) {
			this.renderEl(tmpl.listView(), data, "#productList", "html");
		}
	}),
		instance = null;
	return {
		getInstance: function() {
			if (instance === null) {
				instance = new ProductView();
			}
			return instance;
		}
	}

})