define(["./ui", "./model", "./controller", "../lib/pubsub"], function(ui, model, Controller, pubsub) {
	var company = Controller.extend({
		elements: {
			"element": "elementSelector",
			"element2": "element2Selector"
		},
		events: {
			"selector*event": function() {}
		},
		onHover: function() {

		},
		onClick: function() {

		}
	});
	return company;
})