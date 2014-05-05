define(["./product-view", "./product-model", "../common/Controller", "../lib/PubSub", "../stewardship/stewardshipTable"], function(UI, Model, Controller, pubsub, steTable) {
	var CONST = Controller.CONST,
		Product = Controller.extend({
			getRecordByEvt: function(e) {
				var id = this.View.getRecordIdByEvt(e),
					record = this.Model.getClientRecord(id);
				return record;
			},
			getRecordIdByEvt: function(e) {
				return this.View.getListItemId(e);
			},
			getRecordForm: function() {
				return "#recordForm";
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
				this.initWidgetEvent();
			},
			initWidgetEvent: function() {
				var me = this;
				$('body').delegate(".modal", 'hidden.bs.modal', function(e) {
					me.setRouter("");
				})
			},
			afterSave: function(record, res) {
				if (res[CONST.RESSTATUS] === CONST.RESSTATUSOK) {
					this.View.msg("添加成功");
					this.View.afterSaveRecord(record);
					this.setRouter("");
					this.afterShow();
				} else {
					this.View.error(res[CONST.RESSTATUS]);
				}
			},
			onStewardship: function() {
				var table = steTable.getInstance();
				table.show();
			}
		}),
		options = {
			id: "product",
			View: UI.getInstance(),
			Model: Model,
			events: {
				"#btnSaveRecord click": "onSave",
				"#btnUpdateRecord click": "onUpdate",
				".hook-stewardship click": "onStewardship"
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