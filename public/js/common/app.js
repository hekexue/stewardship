/*
负责初始化路由配置，模块激活、禁用机制，同时负责大型单页面模块延迟加载
 */
define(["./ClassBase", "../lib/JqueryHistory", "../lib/Type", "../lib/PubSub", "../lib/PackageLoader"], function(Class, history, type, PubSub, PkgLoader) {
	function route() {
		//解析当前URL
		//根据URL首个配置确定哪个Controller处于激活状态
		//读取模块内部的路由配置，解析第二个URL的内容，为需要调用的方法
		//解析第三个URL的内容，为该方法需要的参数
	}

	function getHash(window) {
		var match = (window || this).location.href.match(/#(.*)$/);
		return match ? match[1] : '';
	}

	var App = Class.extend({
		init: function(options) {
			var me = this,
				controllers = options.controllers,
				routes = options.routes || {},
				defaultModules = options.defaultModules,
				lazyModules = options.lazyModules;
			this.defaultModules = defaultModules;
			this.lazyModules = lazyModules;
			if (!type.isObject(controllers)) {
				throw new Error("");
			}
			if (!type.isArray(defaultModules)) {
				throw new Error("app need a defaultModule param which tells what module code load first");
			}
			//TODO:此处需要再做机制上的调整
			if (lazyModules) {
				var pubSub = PubSub.getInstance();
				pubSub.on("DefaultControllerReady", function() {
					if (defaultModules) {
						for (var m in defaultModules) {
							if (!defaultModules[m].isAllReady) {
								return;
							}
						}
					}
					me.loadLazyModules(lazyModules);
				})
			}
			if (type.isObject(routes)) {
				this.initRoutes();
			}
		},
		initRoutes: function(routes) {
			var me = this,
				controllers = this.controller,
				hash = "",
				map = [],
				module,
				action,
				params;
			history.init(function() {
				hash = getHash();
				map = hash.split("/");
				module = map[0],
				action = map[1],
				params = type.isString(map[2]) ? decodeURIComponent(map[2]) : "";
				controller = controllers[module];
				if (type.isObject(controller)) {
					if (!controller.actived) {
						controller.active();
						controller.actived = true;
					}
					if (type.isArray) {
						type.isFunction(controller[action]) && controller[action].apply(controller, params);
					}
					controller[action].call(controller, params);
				}
			});
		},
		loadLazyModules: function(lazyModules) {
			var loader = new PkgLoader({
				allLoadedCallback: "",
				scope: '',
				extraData: "",
				resources: [{
					urls: ["../file/name"], //符合requirejs的参数，TODO:此处的依赖路径要填写packageLoader即utils文件夹的位置，应该支持成当前调用文件所在的文件夹的相对路径
					callback: function(res) {
						var Controller = res,
							ctrl = new Controller();
						ctrl.active();
					}, //当前资源组加载完成后的回调函数
					scope: null || window, //回调函数的作用域
					extraData: null //任意回调函数需要的额外的参数
				}, {
					urls: ["../file/name"],
					callback: function() {},
					scope: null || window,
					extraData: null
				}]
			});
			loader.load();
		},
		beforeStart: function() {

		},
		start: function() {
			//加载默认模块
			var modules = this.defaultModules,
				lazyModules = this.lazyModules,
				module = null;
			for (var m in modules) {
				if (type.isObject(m)) {
					m.active();
				}
			}
		}
	})
	return App;
})