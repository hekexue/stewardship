define(["../stewardship/stewardshipModel", "../common/Controller", "../lib/PubSub", "../stewardship/stewardshipTable"], function( Model, Controller, pubsub, steTable) {
var instance = null,
    options= {
        id:"stewardship",
        Model: Model
    },
    riskLevelMap={
      "High":3,
      "LessHigh":2,
      "Normal":1
    },
    Stewardship = Controller.extend({
        init: function (options) {
            this._super(options);
            this.watchChanges();
            this.UI = steTable.getInstance();
        },
        createRecord:function(data){
            return this.Model.createRecord(data,false);
        },
        watchChanges:function(){
            this.Model.watchField("all",this.proxy(this.onFieldChange,this));
        },
        onFieldChange:function(record,attrName,value){
            var itemFieldName = attrName.substring(0, attrName.lastIndexOf(".")),
                subItem = record.getAttr(itemFieldName);
            if(subItem){
                var mostHighRiskLevel = record.getAttr("riskLevel") || "Normal",
                    q1 = subItem.q1,
                    q2 = subItem.q2,
                    Q = subItem.Q,
                    riskLevel = subItem.riskLevel,
                    damageLevel = subItem.damageLevel,
                    superviseComment ="",
                    superviseMode="",
                    companyClass = record.getAttr("companyClass");
                if(attrName.indexOf(".q1")>0){
                    var q11 = attrName==itemFieldName+".q11"? value*1 :record.getAttr(itemFieldName+".q11")*1,
                        q12 = attrName==itemFieldName+".q12"? value*1 :record.getAttr(itemFieldName+".q12")*1,
                        q13 = attrName==itemFieldName+".q13"? value*1 :record.getAttr(itemFieldName+".q13")*1;
                    //计算q1的值
                    q1 = q11+q12+q13;
                    if(q1>0){//q1大于零，则说明q1条件已经满足，需要重新计算
                        record.set(itemFieldName+".q1",q1,false,false);
                    } else{
                        return false;
                    }
                } else if(attrName.indexOf(".q2")>0){
                    //计算q2的值
                    var q21 = attrName==itemFieldName+".q21"? value*1 :record.getAttr(itemFieldName+".q11")*1,
                        q22 = attrName==itemFieldName+".q22"? value*1 :record.getAttr(itemFieldName+".q12")*1,
                        q23 = attrName==itemFieldName+".q23"? value*1 :record.getAttr(itemFieldName+".q13")*1,
                        q24 = attrName==itemFieldName+".q24"? value*1 :record.getAttr(itemFieldName+".q13")* 1,
                        q25 = attrName==itemFieldName+".q25"? value*1 :record.getAttr(itemFieldName+".q13")*1;
                    q2 = q21 + q22+q23+q24+q25;
                    if(q2>0){
                        record.set(itemFieldName+".q2",q2,false,false);
                    }else{
                        return false;
                    }
                } else if(attrName.indexOf(".damageLevel")>0){
                    damageLevel = value;
                    record.set(itemFieldName+".damageLevel",damageLevel,false,false);
                    //计算风险等级
                }
                Q = (q1/100)*(q2/100);
                if(Q>0){
                    record.set(itemFieldName+".Q",Q,false,false);
                    this.UI.showQ(Q,itemFieldName+".Q");
                }
                if(Q>0 && damageLevel) {
                    switch (damageLevel) {
                        case "A":
                        {
                            if (Q > 1 / 1000) {
                                riskLevel = "High";
                            } else if (Q < 1 / 1000 && Q > 1 / 100000) {
                                riskLevel = "LessHigh";
                            } else if (Q < 1 / 100000) {
                                riskLevel = "Normal";
                            }
                            record.set(itemFieldName + ".riskLevel", riskLevel, false, false);

                            break;
                        }
                        case "B":
                        {
                            if (Q > 1 / 100) {
                                riskLevel = "High";
                            } else if (Q < 1 / 100 && Q > 1 / 10000) {
                                riskLevel = "LessHigh";
                            } else if (Q < 1 / 10000) {
                                riskLevel = "Normal";
                            }
                            record.set(itemFieldName + ".riskLevel", riskLevel, false, false);
                            break;
                        }
                        case "C":
                        {
                            if (Q > 1 / 10) {
                                riskLevel = "High";
                            } else if (Q < 1 / 10 && Q > 1 / 1000) {
                                riskLevel = "LessHigh";
                            } else if (Q < 1 / 1000) {
                                riskLevel = "Normal";
                            }
                            record.set(itemFieldName + ".riskLevel", riskLevel, false, false);
                            break;
                        }
                        case "D":
                        {
                            if (Q > 1 / 10) {
                                riskLevel = "LessHigh";
                            } else if (Q < 1 / 10) {
                                riskLevel = "Normal";
                            }
                            record.set(itemFieldName + ".riskLevel", riskLevel, false, false);
                            break;
                        }
                    }
                    if (riskLevel && riskLevel.length > 0) {
                        mostHighRiskLevel = this.getHighestRiskLevel(record.attributes);
                        record.set("riskLevel",mostHighRiskLevel);
                        this.UI.showRiskLevel(itemFieldName + ".risk" + riskLevel);
                        switch (companyClass) {
                            case "1":
                            {
                                if (mostHighRiskLevel === "High") {
                                    superviseMode = "验证监管或信用监管";
                                } else {
                                    superviseMode = "信用监管";
                                }
                                break;
                            }
                            case "2":
                            {
                                if (mostHighRiskLevel === "High") {
                                    superviseMode = "一般监管";
                                } else if (mostHighRiskLevel === "LessHigh") {
                                    superviseMode = "一般监管或验证监管";
                                } else {
                                    superviseMode = "验证监管";
                                }
                                break;
                            }
                            case "3":
                            {
                                if (mostHighRiskLevel === "High") {
                                    superviseMode = "严密监管";
                                } else if (mostHighRiskLevel === "LessHigh") {
                                    superviseMode = "严密监管或一般监管";
                                } else {
                                    superviseMode = "一般监管";
                                }
                                break;
                            }
                            case "4":
                            {
                                superviseMode = "特别监管";
                                break;
                            }
                        }

                        var risk = "";
                        switch (riskLevel){
                            case "High":risk ="高风险等级";break;
                            case "LessHigh":risk="较高风险等级";break;
                            case "Normal":risk = "一般风险等级";break;
                        }
                        superviseComment = "当前产品风险等级为：【 "+risk+" 】，建议采用的监管方式为：【 " + superviseMode +" 】"
                        record.set("superviseMode", superviseMode, false, false);
                        record.set("superviseComment", superviseComment, false, false);
                        this.UI.showSuperviserComment(superviseComment);
                    }
                }
                //this.fire
            }
        },
        getHighestRiskLevel: function (record) {
            var item = null,subItem = null, riskLevel="Normal";
            for(var i in record){
                item = record[i];
                for(var j in item){
                   subItem = item[j];
                    if(subItem.riskLevel){
                        riskLevelMap[subItem.riskLevel] > riskLevelMap[riskLevel] ? riskLevel = subItem.riskLevel:"";
                    }
                }
            }
            return riskLevel;
        },
        customDataBind: {
            rule:/(.riskLevel|.damageLevel)$/g,
            handler:function(field,value,dom){
                var itemFieldName =field.substring(0, field.lastIndexOf(".")),
                    riskLevel,
                    damageLevel;
                if(filed.indexOf(".riskLevel")){
                    riskLevel = value;
                    this.UI.showRiskLevel(itemFieldName +".risk" + value);
                }else if(filed.indexOf("damageLevel")){
                    this.UI.showDamage(itemFieldName+"."+ value);
                }
            }
        }
    });
    return {
        getInstance:function(){
            if (instance === null) {
                instance = new Stewardship(options);
            }
            return instance;
        }
    };
});
