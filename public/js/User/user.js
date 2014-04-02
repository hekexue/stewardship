define(["jquery", "./ClassBase", "./DataSource"], function($, Class, Ds) {
	var Model = Class.extend({
		init: function() {
			this.records = {};
			//新建一个记录
			var instance = Object.create(this.prototype);
			instance.init.apply(instance, arguments)
			//将新纪录添加到数据集中
			this.records[instance.id] = instance;
			return instance;
		},
		save: function() {

		},
		update: function() {

		},
		read: function() {

		},
		delete: function() {

		}
	});
	Model.create = function(extend) {
		var fun = Model.extend(extend);
		//生成类方法
		fun.ext({
			records: {},
			find: function(id) {
				return this.records[id];
			},
			stringify: function() {

			},
			toJSON: function() {

			},
			saveLocal: function() {

			},
			loadLocal: function() {

			},
			loadRemote: function() {

			}
		})
		return fun;
	}
	//将model原有的继承方式改为创建方式，有别于其他类的继承
	Model.extend = Model.create;
	return Model;
})