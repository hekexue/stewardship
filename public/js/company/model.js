define(["../common/Model"], function(Model) {
	var CompanyModel = Model.create({
		remoteActions: {
			save: {
				controller: "company",
				action: "add"
			},
			update: {
				controller: "company",
				action: "update"
			},
			remove: {
				controller: "company",
				action: "remove"
			},
			read: {
				controller: "company",
				action: "read"
			},
			list: {
				controller: "company",
				action: "list"
			}
		}
	});
	return CompanyModel;
})