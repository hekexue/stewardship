define(["jquery", "../widgets/floatbox", "./template", "../lib/PubSub", "./stewardshipModel"], function($, Box, template, PubSub, Model) {
    var pubsub = PubSub.getInstance();
	var Table = Box.extend({
			template: template.table(),
			init: function(options) {
				this.options = options || {};
				this.elem = null;
				this.renderDvata = $.extend({
					data: {}
				}, options);
				this.render();

			},
			bindEvent: function() {
				var me = this;
				this.elem.delegate("table.tb td[col]", "mouseenter mouseleave", this.onTableHover);
				//this.elem.delegate("table.tb .ipt", "mouseover", this.onTableHover);
				this.elem.delegate("table.tb .ipt", "focus", this.onTableHover);
				this.elem.delegate("table.tb .ipt", "blur", this.onTableHover);
				this.elem.delegate("table.tb .check", "click", this.proxy(this.onCheckClick,this));
				this.elem.delegate("table.tb .ipt", "change", function() {
					var ipt = $(this),
						tr = ipt.closest("tr").find(".ipt");
				});
				this.elem.delegate(".ipt", "change", $.proxy(this.onSetValue, this));
				this.elem.delegate(".hook-ok", "click", $.proxy(this.onOK, this));
				this.elem.delegate(".hook-reset", "click", $.proxy(this.onReset, this));
			},
			beforeRender: function() {
				return {};
			},
			reRender: function(data) {
				var newEl = $(TP.tmpl(template, data));
				this.elem.find("table").replaceWith(newEl.find("table"));
			},
			setData: function(data) {
				this.sdData = data;
			},
			onCheckClick: function(e) {
				var td = $(e.target).closest("td"),
                    span = td.find("span"),
                    field = span.attr("data-bind"),
                    value = span.html();
				td.siblings().removeClass("checked");
				td.addClass("checked");
                var record = this.dataPicker(this.getView());
                field = field.substring(0,field.lastIndexOf("."))+".damageLevel";
                record.set(field,value);
			},
			getView: function() {
				return this.elem.find("table") || null;
			},
			onTableHover: function(e) {
				var td = $(this).closest("td"),
					tr = td.closest("tr"),
					rowNum = td.attr("row"),
					colNum = td.attr("col"),
					table = instance.elem.find('table.tb'),
					thead = table.find("thead"),
					row = table.find("td[row=" + rowNum + "]:lt(" + (colNum - 1) + ")"),
					col = table.find("td[col=" + colNum + "]:lt(" + (rowNum - 1) + ")");
				if (e.type == "mouseenter" || e.type == "mouseover" || e.type == "focusin") {
					table.find("td,th").removeClass("border-top border-bottom border-left border-right");
					row.addClass("border-top border-bottom");
					col.addClass("border-left border-right");
					td.addClass("ms-hover border-right border-bottom");
					td.closest("tr").find(".row-title").addClass("border-top border-bottom border-left");
					thead.find("th[col=" + colNum + "]").addClass("border-top border-left border-right");
				} else {
					row.removeClass("border-top border-bottom");
					col.removeClass("border-left border-right");
					td.removeClass("ms-hover border-right border-bottom");
					td.closest("tr").find(".row-title").removeClass("border-top border-bottom border-left");
					thead.find("th[col=" + colNum + "]").removeClass("border-top border-left border-right");
				}
			},
			onSetValue: function(e) {
				var ipt = $(e.target),
				reg = /^([0-9]\d?(\.\d+)?)$/,
				value = ipt.val()+"";
				if(reg.test(value) && value*1<100){
					ipt.removeClass("btn-danger");
					value = parseFloat(value).toFixed(2);
					ipt.val(value);
				}else{
					//提示输入合法的数据格式
					ipt.focus();
					ipt.addClass("btn-danger");
				}
				//判断是否为数值
                var dataField = ipt.attr("data-bind");
				//获取应该填写的数据输入项

				//如果全部都有值，则计算对应值，如果某个输入框为空或者不合法，则需要


			},
			dataPicker: function(view) {
				var id = view.attr("data-id"),
					record = Model.getClientRecord(id);
                return record;
				//遍历view 的data-bind属性，赋值给record；
			},
            showRiskLevel: function (field) {
                var span = this.elem.find("[data-bind='"+field+"']"),
                    tr = span.closest("tr");
                tr.find("[type='risk']").removeClass("checked");
                span.addClass("checked");
            },
            showQ:function(value,field){
                this.elem.find('[data-bind="' + field +'"]').val(value);
            },
            showDamage:function(value,field){
                var dom = this.elem.find("[data-bind=']"+ field +"']");
                    td = dom.closest("td");
                td.siblings().removeClass("checked");
                td.addClass("checked");
            },
            showSuperviserComment:function(value){
                this.elem.find("[data-bind='superviseComment']").val(value);
            },
			onOK: function() {
				var data = this.dataPicker(this.getView());
				pubsub.publish("stewardshiptable:ok", data);
			},
			onReset: function() {
				this.elem.find("input").val("");
				this.elem.find("td").removeClass("checked");
                this.elem.find(".checked").removeClass("checked");
			}
		}),
		instance = null;

	return {
		getInstance: function(data) {
			if (instance === null) {
				instance = new Table();
			} else if (Object.prototype.toString.call(data) === "[object Object]") {
				instance.reRender(data);
			}
			return instance;
		},
		show: function(data) {
			if (instance === null) {
				instance = this.getInstance(data);
			}
			instance.show();
			return instance;
		}
	};
})