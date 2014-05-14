define(["jquery", "../common/View", "./product-template"], function($, View, tmpl) {
	var ProductView = View.create({
		options: {
			id: "product",
			parentEl: "#mainView",
			template: tmpl.defaultView()
		},
		getRecordIdByEvt: function(e) {
			var id = $("#recordForm").find("form").attr("data-id");
			// if (id === undefined) {
			//	id = $("#tabProduct").find("form").attr("data-id");
			// }
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
			var dom = this.renderEl(tmpl.record(), {
				"data": record
			}),
				me = this;
			this.win({
				title: "新建",
				msg: dom,
				footer: '<button id="btnSaveRecord" class="btn btn-success">保存</button>'
			});
		},
		showEdit: function(record) {
			var dom = this.renderEl(tmpl.record(), {
				"data": record
			});
			this.win({
				title: "编辑",
				msg: dom,
				footer: '<button id="btnUpdateRecord" class="btn btn-success">保存</button>',
			});
		},
		afterSaveRecord: function() {
			this.hideWin();
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