define(["jquery", "../widgets/floatbox", "./template"], function($, Box, template) {
	var Table = Box.extend({
		template: template.table(),
		init: function(options) {
			this.options = options || {};
			this.elem = null;
			this.renderData = $.extend({
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
			this.elem.delegate("table.tb .check", "click", this.onCheckClick);
			this.elem.delegate("table.tb .ipt", "change", function() {
				var ipt = $(this),
					tr = ipt.closest("tr").find(".ipt[]")
			});
			this.elem.delegate(".ipt", "change", $.proxy(this.onSetValue, this));
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
		onCheckClick: function() {
			var td = $(this).closest("td");
			td.siblings().removeClass("checked");
			td.addClass("checked");
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
			var ipt = $(e.target);
			//判断是否为数值
			//获取应该填写的数据输入项
			//如果全部都有值，则计算对应值，如果某个输入框为空或者不合法，则需要
		},
		onOK: function() {

		},
		onReset: function() {

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
		}
	}
})