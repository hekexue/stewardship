define(["../common/Model"], function(Model) {
	var ProductModel = Model.create({
		id: "product",
		remoteActions: {
			save: {
				controller: "product",
				action: "add"
			},
			update: {
				controller: "product",
				action: "update"
			},
			remove: {
				controller: "product",
				action: "remove"
			},
			read: {
				controller: "product",
				action: "read"
			},
			list: {
				controller: "product",
				action: "list"
			}
		}
	});
	return ProductModel;
})