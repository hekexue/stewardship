/**
 * 包加载管理器
 * @return {[type]} [description]
 */
define(["require", "./PubSub", "./Type"], function(require, evt, type) {
	function ResourceLoader() {
		this.Event = evt.getInstance();
		this.typeCheck = type;
		this.loading = false;
		this.allResNumber = 0,
		this.loadedResNumber = 0;
		this.loadResults = [];
	}
	/**
	 * 加载资源
	 * @param  {Object} config 加载资源的参数配置项
	 * @ 参数示例
		{	
			allLoadedCallback: "",
			scope:'',
			extraData:"",
			resources: [{
				urls: ["../file/name"], //符合requirejs的参数，TODO:此处的依赖路径要填写packageLoader即utils文件夹的位置，应该支持成当前调用文件所在的文件夹的相对路径
				callback: function() {}, //当前资源组加载完成后的回调函数
				scope: null || window, //回调函数的作用域
				extraData: null //任意回调函数需要的额外的参数
			}, {
				urls: ["../file/name"], 
				callback: function() {},
				scope: null || window,
				extraData: null
			}]
		}
	 * @return {null}
	 */
	ResourceLoader.prototype.load = function(config) {
		if (this.loading) {
			throw new error("请将需要的资源一次加载完成，或者使用新的脚本加载实例来完成新的加载任务")
		}
		if (!this.typeCheck.isObject(config)) {
			throw new error("资源加载配置参数错误，请传递配置参数或allLoadedEvent配置项")
		}
		var reses = config.resources,
			i = 0,
			res = null,
			len = reses.length;
		this.loadingCfg = config,
		this.allResNumber = len,
		this.loadedResNumber = 0;
		while (len--) {
			res = reses[len];
			require(res.urls, this.singleLoaded(res.scope, res.extraData, res.callback));
		}
	}

	/**
	 * 单个资源项加载完成
	 * @param  {Object}   scope     回调函数作用域
	 * @param  {Object}   extraData 回调函数需要的额外的参数数据
	 * @param  {Function} callback  单个资源项加载完成后的回调函数
	 * @return {[type]}             [description]
	 */
	ResourceLoader.prototype.singleLoaded = function(scope, extraData, callback) {
		var scp = scope || window,
			me = this;
		return function() {
			var args = Array.prototype.slice.call(arguments, 0);
			extraData && args.push(extraData);
			if (me.typeCheck.isFunction(callback)) {
				callback.apply(scp, args)
			}
			me.loadResults.push(args);
			me.loadedResNumber++,
			me.loadedResNumber >= me.allResNumber && me.allLoaded()
		}
	}
	/**
	 * 清空资源加载器的各个参数
	 * @return {[type]} [description]
	 */
	ResourceLoader.prototype.clear = function() {
		this.loading = false;
		this.allResNumber = 0;
		this.loadedResNumber = 0;
		this.loadResults = [];
	}
	/**
	 * 全部资源加载完成后处理函数
	 * @return {[type]} [description]
	 */
	ResourceLoader.prototype.allLoaded = function() {
		var results = this.loadResults.slice(0),
			fn;
		//处理返回数据
		if (this.typeCheck.isObject(this.loadingCfg)) {
			fn = this.loadingCfg.allLoadedCallback;
			var scope = this.loadingCfg.scope || window,
				extraData = this.loadingCfg.extraData || undefined;
			results.push(extraData);
			fn.apply(scope, results);
		} else if (this.typeCheck.isFunction(this.loadingCfg)) {
			fn = this.loadingCfg;
			fn.apply();
		}
		this.clear();
	}
	//TODO:需要考察Requirejs是否有资源加载失败的对应处理函数，然后再做修改
	ResourceLoader.prototype.loadSingleError = function() {

	}
	return ResourceLoader;
})