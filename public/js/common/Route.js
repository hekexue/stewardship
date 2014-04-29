define(function() {
	// Cached regular expressions for matching named param parts and splatted
	// parts of route strings.
	var optionalParam = /\((.*?)\)/g;
	var namedParam = /(\(\?)?:\w+/g;
	var splatParam = /\*\w+/g;
	var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;
	var breaker = {};

	function each(obj, iterator, context) {
		if (obj === null) return obj;
		if (obj.length === +obj.length) {
			for (var i = 0, length = obj.length; i < length; i++) {
				if (iterator.call(context, obj[i], i, obj) === breaker) return;
			}
		} else {
			var keys = _.keys(obj);
			for (var i = 0, length = keys.length; i < length; i++) {
				if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
			}
		}
		return obj;
	}

	function map(obj, iterator, context) {
		var results = [];
		if (obj == null) return results;
		each(obj, function(value, index, list) {
			results.push(iterator.call(context, value, index, list));
		});
		return results;
	}

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
			return map(params, function(param) {
				return param ? decodeURIComponent(param) : null;
			});
		}
	}
})