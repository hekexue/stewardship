define(["./product-view", "./product-model",  "../stewardship/stewardshipModel", "../common/Controller", "../lib/PubSub", "../stewardship/stewardshipTable"], function(UI, Model,stewardshipModel, Controller, pubsub, steTable) {
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
			onStewardship: function(e) {
				//从数据源中获取“评判”数据，如果是空或者undefined，则创建一个；将其绑定到视图中；
				var record = this.getRecordByEvt(e),
				table = steTable.getInstance(),
				view = table.getView(),
				stshipData = record.getAttr("stewardship");
				if(stshipData === null){
					stshipData = stewardshipModel.createRecord();
				}
				
				
				this._bind(view,stshipData);
				table.show();
			}
		}),
		options = {
			id: "product",
			View: UI.getInstance(),
			Model: Model,
			events: {
				"#btnSaveRecord click g": "onSave",
				"#btnUpdateRecord click g": "onUpdate",
				".hook-stewardship click g": "onStewardship"
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