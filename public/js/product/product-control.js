define(["./product-view", "./product-model",  "../stewardship/stewardship-controller", "../common/Controller", "../lib/PubSub", "../stewardship/stewardshipTable"], function(UI, Model,stewardship, Controller, Pubsub, steTable) {
	var pubsub = Pubsub.getInstance(),
        CONST = Controller.CONST,
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
				return "#recordForm form";
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
                this.stewardship = stewardship.getInstance();
			},
			initWidgetEvent: function() {
				var me = this;
				$('body').delegate(".modal", 'hidden.bs.modal', function(e) {
					me.setRouter("");
				});
                pubsub.on("stewardshiptable:ok",function(data){
                    me.onStewardshipOk(data);
                });
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
            afterUpdate: function(record, res) {
                if (res[CONST.RESSTATUS] === CONST.RESSTATUSOK) {
                    this.View.msg("更新成功");
                    this.View.afterUpdateRecord(record);
                    this.setRouter("");
                    this.afterShow();
                } else {
                    this.View.error(res[CONST.RESSTATUS]);
                }
            },
            onStewardshipOk:function(data){
                var record = this.Model.getClientRecord(data.id);
                record.set("stewardship",data,false,false);
                record.set("superviseComment", data.attributes.superviseComment);
                record.set("riskLevel", data.attributes.riskLevel);
            },
			onStewardship: function(e) {
				//从数据源中获取“评判”数据，如果是空或者undefined，则创建一个；将其绑定到视图中；
				var record = this.getRecordByEvt(e),
				table = steTable.getInstance(),
				view = table.getView(),
				stshipData = record.getAttr("stewardship");
				if(stshipData === null){
					stshipData = this.stewardship.createRecord({
                        _id:record.id,
                        physicalDamage:{
                            electric:{
                                damageLevel:"",
                                q11:"",
                                q12:"",
                                q13:"",
                                q21:"",
                                q22:"",
                                q23:"",
                                q24:"",
                                q25:"",
                                Q:"",
                                riskLevel:""
                            },
                            mechanical:{
                                damageLevel:"",
                                q11:"",
                                q12:"",
                                q13:"",
                                q21:"",
                                q22:"",
                                q23:"",
                                q24:"",
                                q25:"",
                                Q:"",
                                riskLevel:""
                            },
                            electromagnetic:{
                                damageLevel:"",
                                q11:"",
                                q12:"",
                                q13:"",
                                q21:"",
                                q22:"",
                                q23:"",
                                q24:"",
                                q25:"",
                                Q:"",
                                riskLevel:""
                            },
                            hotAndFire:{
                                damageLevel:"",
                                q11:"",
                                q12:"",
                                q13:"",
                                q21:"",
                                q22:"",
                                q23:"",
                                q24:"",
                                q25:"",
                                Q:"",
                                riskLevel:""
                            },
                            radioactive:{
                                damageLevel:"",
                                q11:"",
                                q12:"",
                                q13:"",
                                q21:"",
                                q22:"",
                                q23:"",
                                q24:"",
                                q25:"",
                                Q:"",
                                riskLevel:""
                            },
                            hearingAndSight:{
                                damageLevel:"",
                                q11:"",
                                q12:"",
                                q13:"",
                                q21:"",
                                q22:"",
                                q23:"",
                                q24:"",
                                q25:"",
                                Q:"",
                                riskLevel:""
                            },
                            physicalEnvironment:{
                                damageLevel:"",
                                q11:"",
                                q12:"",
                                q13:"",
                                q21:"",
                                q22:"",
                                q23:"",
                                q24:"",
                                q25:"",
                                Q:"",
                                riskLevel:""
                            }
                        },
                        chemicalDamage:{
                            poisonous:{
                                damageLevel:"",
                                q11:"",
                                q12:"",
                                q13:"",
                                q21:"",
                                q22:"",
                                q23:"",
                                q24:"",
                                q25:"",
                                Q:"",
                                riskLevel:""
                            },
                            skinHarmful:{
                                damageLevel:"",
                                q11:"",
                                q12:"",
                                q13:"",
                                q21:"",
                                q22:"",
                                q23:"",
                                q24:"",
                                q25:"",
                                Q:"",
                                riskLevel:""
                            },
                            chemicalEnvironment:{
                                damageLevel:"",
                                q11:"",
                                q12:"",
                                q13:"",
                                q21:"",
                                q22:"",
                                q23:"",
                                q24:"",
                                q25:"",
                                Q:"",
                                riskLevel:""
                            }
                        },
                        biologicalDamage:{
                            pathogenic:{
                                damageLevel:"",
                                q11:"",
                                q12:"",
                                q13:"",
                                q21:"",
                                q22:"",
                                q23:"",
                                q24:"",
                                q25:"",
                                Q:"",
                                riskLevel:""
                            },
                            biologicalEnvironment:{
                                damageLevel:"",
                                q11:"",
                                q12:"",
                                q13:"",
                                q21:"",
                                q22:"",
                                q23:"",
                                q24:"",
                                q25:"",
                                Q:"",
                                riskLevel:""
                            }
                        },
                        consumersRightDamage:{
                            cheatedDamage:{
                                damageLevel:"",
                                q11:"",
                                q12:"",
                                q13:"",
                                q21:"",
                                q22:"",
                                q23:"",
                                q24:"",
                                q25:"",
                                Q:"",
                                riskLevel:""
                            },
                            misleadDamage:{
                                damageLevel:"",
                                q11:"",
                                q12:"",
                                q13:"",
                                q21:"",
                                q22:"",
                                q23:"",
                                q24:"",
                                q25:"",
                                Q:"",
                                riskLevel:""
                            }
                        }
                    });
                    var companeyClass = record.getAttr("companyClass");
                    if(companeyClass){
                        stshipData.set("companyClass", record.getAttr("companyClass"));
                    }else{
                        this.View.error("请先选择企业类型");
                    }
				}else{
                    stshipData.attributes._id = stshipData.id = record.id;
                    stshipData = this.stewardship.createRecord(stshipData.attributes);
                }
                this._bind(view,stshipData,this.stewardship.customDataBind);
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
	};

})