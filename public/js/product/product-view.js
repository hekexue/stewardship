define(["jquery", "../common/View", "./product-template"], function($, View, tmpl) {
	var ProductView = View.create({
		options: {
			id: "product",
			parentEl: "#mainView",
			template: tmpl.defaultView()
		},
		getRecordIdByEvt: function(e) {
			var id = $(e.target).closest("form").attr("data-id");
			if (id === undefined) {
				id = $("#tabProduct").find("form").attr("data-id");
			}
			return id;
		},
		getListItemId: function(e) {
			if (e) {
				var id = $(e.target).closest("tr").attr("id");
				return id;
			} else {
				return "";
			}
		},
		showAdd: function(record) {
			var win = "";
			if (!this.addWinInited) {
				this.addWinInited = true;
				this.renderEl(tmpl.add(), {
					"data": record
				}, "#tabProduct", "append");
			}
			$("#productRrecordWin").modal();
		},
		showEdit: function(record) {
			var win = "";
			if (!this.addWinInited) {
				this.addWinInited = true;
				this.renderEl(tmpl.add(), {
					"data": record
				}, "#tabProduct", "append");
			}
			$("#productRrecordWin").modal();
		},
		afterSaveRecord: function() {
			$("#productRrecordWin").modal("hide");
		},
		afterUpdateRecord: function(record) {
			$("#stewradshipWindow").modal("hide");
		},
		afterRemoveRecord: function(record) {
			$("#" + record.attributes._id).remove();

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