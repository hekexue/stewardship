define(function() {
	// Cached regular expressions for matching named param parts and splatted
	// parts of route strings.
	var optionalParam = /\((.*?)\)/g;
	var namedParam = /(\(\?)?:\w+/g;
	var splatParam = /\*\w+/g;
	var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
	return {
		routeToRegExp: function(route) {
			route = route.replace(escapeRegExp, '\\$&')
				.replace(optionalParam, '(?:$1)?')
				.replace(namedParam, function(match, optional) {
					return optional ? match : '([^\/]+)';
				})
				.replace(splatParam, '(.*?)');
			return new RegExp('^' + route + '$');
		},
		// Given a route, and a URL fragment that it matches, return the array of
		// extracted decoded parameters. Empty or unmatched parameters will be
		// treated as `null` to normalize cross-browser behavior.
		extractParameters: function(route, fragment) {
			var params = route.exec(fragment).slice(1);
			return _.map(params, function(param) {
				return param ? decodeURIComponent(param) : null;
			});
		}
	}
})