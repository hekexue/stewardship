require.config({
	paths: {
		"jquery": "../common/jquery-1.10.2.min"
	}
});

define(["jquery", "./login"], function($, login) {
	var UI = {
		init: function() {
			this.initEvent();
		},
		initEvent: function() {
			var me = this;
			$("body").delegate("#inputEmail", "blur", function(e) {
				me.onAccountChange(e);
			});
			$("body").delegate("#inputPassword", "blur", function(e) {
				me.onPwdChange(e);
			});
			$("body").delegate("#login", "click", function() {
				me.onLogin();
			});
			$("body").delegate(".close","click",function(){
				$(this).parent().hide();
			});
			$("body").bind("err",function(){
				me.err.apply(me,arguments);
			});
		},
		onAccountChange: function(evt) {
			var ipt = $(evt.target),
				div = ipt.closest("div"),
				val = ipt.val();
			if (!val || val.length === 0) {
				div.addClass("has-error");
				this.err("account can't be emtpy");
			} else {
				div.removeClass("has-error");
				this.err();
			}			
		},
		onPwdChange: function(evt) {
			var ipt = $(evt.target),
				div = ipt.closest("div"),
				val = ipt.val();
			if (!val || val.length === 0) {
				div.addClass("has-error");
				this.err("password can't be emtpy");
			} else {
				div.removeClass("has-error");
				this.err();
			}			
		},
		onLogin: function() {
			var userData = this.getUserData();
		},
		err: function(msg) {
			var err = $("#err");
			if (err.length === 0) {
				err = $('<div id="err" class="alert alert-danger"></div>');				
				err.appendTo($(".err"));
			};
			if (msg) {
				err.html(msg);
				err.parent().show();
			} else {
				err.parent().hide();
			}
		}
	},
		Model = login;
	UI.init();
})