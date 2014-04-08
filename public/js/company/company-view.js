define(["jquery", "../common/View"], function($, View) {
	var CompanyView = View.create({
		id: "company",
		options: {
			parentEl: "#mainView",
			template: tmpl.defaultView()
		},
		showAdd: function(record) {
			var win = "";
			if (!this.addWinInited) {
				this.addWinInited = true;
				this.renderEl(tmpl.add(), record, "body", "append");
			}
			$("#companyWindow").show();
		},
		showEdit: function(record) {
			var win = "";
			if (!this.addWinInited) {
				this.addWinInited = true;
				this.renderEl(tmpl.record(), record, "#recordForm", "replace");
			}
			$("#companyWindow").show();
		},
		afterSaveRecord: function() {
			$("#companyWindow").hide();
		},
		afterUpdateRecord: function(record) {
			$("#companyWindow").hide();
		},
		renderList: function(data) {
			this.renderEl(tmpl.listView(), data, "#companyList", "html");
		}
	}),
		instance = null;
	return {
		getInstance: function() {
			if (instance === null) {
				instance = new CompanyView();
			}
			return instance;
		}
	}

})