define(["jquery", "../common/View"], function($, View) {
	var CompanyView = View.create({}),
		instance = null;
	return {
		getInstance: function() {
			if (instance === null) {
				instance = new CompanyView();
			}
			return instance;
		}
	}

})