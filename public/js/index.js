require.config({
	paths: {
		"jquery": "./common/jquery-1.10.2.min"
	}
});
define(['./common/App', './product/product-control'], function(App, Product) {

	var product = new Product();
	var app = new App({
		routes: {
			"product/": product.proxy(product.active, product),
			"product/add": product.proxy(product.onAdd, product),
			"product/edit": product.proxy(product.onEdit, product),
			"product/remove": product.proxy(product.onRemove, product)
		},
		defaultModules: [product],
		lazyModules: [{
			urls: ["../company/company-control"], //符合requirejs的参数，TODO:此处的依赖路径要填写packageLoader即utils文件夹的位置，应该支持成当前调用文件所在的文件夹的相对路径
			callback: function(res) {
				var Controller = res,
					ctrl = new Controller();
				app.regist("company", ctrl);
			}, //当前资源组加载完成后的回调函数
			scope: null || window, //回调函数的作用域
			extraData: null //任意回调函数需要的额外的参数
		}]
	});
	app.regist("product", product);

	app.start();
})