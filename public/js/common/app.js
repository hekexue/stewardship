/*
负责初始化路由配置，模块激活、禁用机制，同时负责大型单页面模块延迟加载
 */
define(["jquery", "./ClassBase", "./Route", "../lib/JqueryHistory", "../lib/Type", "../lib/PubSub", "../lib/PackageLoader"], function($, Class, Route, history, type, PubSub, PkgLoader) {
	function getHash(window) {
		var match = (window || this).location.href.match(/#(.*)$/);
		return match ? match[1] : '';
	}
	var App = Class.extend({
		init: function(options) {
			var me = this,
				//controllers = options.controllers,
				routes = options.routes || {},
				defaultModules = options.defaultModules,
				lazyModules = options.lazyModules;
			this.routes = routes;
			this.defaultModules = defaultModules;
			this.lazyModules = lazyModules;
			// if (!type.isObject(controllers)) {
			//	throw new Error("");
			// }
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

			//监听所有的路由
			$(document).delegate("a[href^='#']", "click", function(e) {
				//e.preventDefault();
				me.setRouteSource(e);
			});
			$(document).delegate("*[route^='#']", "click", function(e) {
				var route = $(e.target).attr("route");
				me.setRouteSource(e);
				me.setRoutePath(route);
			})
		},
		setRoutePath: function(route) {
			if (type.isString(route) && route.length > 0) {
				if (route.indexOf("#") < 0) {
					route = "#" + route;
				}
				window.location.hash = route;
			}
		},
		setRouteSource: function(e) {
			this.routeSourece = e;
		},
		getRouteSource: function() {
			return this.routeSourece || null;
		},
		convertRoutes: function(routes) {
			var tmpr = "";
			if (!type.isObject(this.routes)) {
				this.routes = {};
			}
			for (var r in routes) {
				tmpr = Route.routeToRegExp(r);
				//转换路由为正则表达式
				this.routes[r].regexp = tmpr;
			}
		},
		initRoutes: function(routes) {
			var me = this,
				hash = "",
				map = [],
				handler,
				context,
				extraParam,
				ctrl,
				action,
				params;

			this.convertRoutes(routes);
			history.history.init(function() {
				var reg, routes;
				routes = me.routes;
				hash = getHash();
				if (hash) {
					ctrl = me.controllers[hash.substring(0, hash.indexOf("/"))];
					if (type.isObject(ctrl)) {
						if (!ctrl.actived) {
							ctrl.active();
						}
					}
					for (var rt in routes) {
						reg = routes[rt].regexp;
						if (reg.test(hash)) {
							params = Route.extractParameters(reg, hash);
							params.unshift(me.getRouteSource());
							action = routes[rt];
							if (type.isString(action)) {
								action = ctrl[action];
								action.apply(ctrl, params);
							} else if (type.isFunction(action)) {
								action.apply(null, params);
							} else if (type.isObject(action)) {
								handler = action["handler"];
								context = action["context"];
								extraParam = action["params"];
								type.isArray(extraParam) ? params = params.concat(action["params"]) : !type.isNull(extraParam) && !type.isUndefined(extraParam) ? params.push(extraParam) : "";
								handler.apply(context, params);
							}
						}
					}
				}
			});
		},
		loadLazyModules: function(lazyModules) {
			var loader = new PkgLoader({
				allLoadedCallback: "",
				scope: '',
				extraData: "",
				resources: lazyModules
			});
			loader.load();
		},
		beforeStart: function() {

		},
		regist: function(name, module) {
			if (type.isString(name) && type.isObject(module)) {
				if (!type.isObject(this.controllers)) {
					this.controllers = {};
				}
				this.controllers[name] = module;
			}
		},
		route: function(routes, handler) {
			if (type.isObject(routes)) {
				for (var r in routes) {
					if (!this.routes[r]) {
						this.routes[r] = routes[r];
						this.routes[r].regexp = Route.routeToRegExp(r);
					}
				}
			}
		},
		start: function() {
			//加载默认模块
			var modules = this.defaultModules,
				lazyModules = this.lazyModules,
				module = null;
			for (var i = 0, c = null; c = modules[i]; i++) {
				if (type.isObject(c)) {
					c.active();
				}
			}
			if (type.isObject(this.routes)) {
				this.initRoutes(this.routes);
			}
		}
	});
	return App;
})