define(function() {
	var Events = {},
		instance = null;

	function Pubsub() {}
	Pubsub.prototype.publish = function(name) {
		var i = 0,
			len = 0,
			hds = [],
			hd = null,
			extra = Array.prototype.slice.call(arguments, 1),
			fn = function() {},
			args = [],
			scope = this,
			evs = Events;
		if (typeof name === "string") {
			evs[name] ? (hds = evs[name]) : "";
			len = hds.length;
			for (; i < len; i++) {
				hd = hds[i];
				if (hd) {
					if (Object.prototype.toString.call(hd) === "[object Object]") {
						fn = hd.fn || fn;
						scope = hd.scope || this;
						args = hd.args || [];
					}
					if (Object.prototype.toString.call(hd) === "[object Function]") {
						fn = hd;
					}
					args = args.concat(extra);
					fn.apply(scope, args);
				}
			}
		}
	}

	Pubsub.prototype.on = Pubsub.prototype.listen = function(name, handler) {
		if (typeof name === "string") {
			Events[name] ? Events[name].push(handler) : (Events[name] = [], Events[name].push(handler))
		}
	}

	Pubsub.prototype.un = Pubsub.prototype.unListen = function(name, handler) {
		var i = 0,
			len = 0,
			hds = [],
			hd = null,
			extra = Array.prototype.slice.call(arguments, 1),
			fn = function() {},
			args = [],
			scope = this,
			evs = Events;
		if (typeof name === "string") {
			Events[name] ? hds = Events[name] : "";
			len = hds.length;
			for (; i < len; i++) {
				if (hds[i] === handler) {
					hds.splice(i, 1);
					break;
				}
			}
		}
	}

	Pubsub.prototype.unListenAll = function(name) {
		if (typeof name === "string") {
			delete Events[name];
			return true;
		}
	}
	return {
		getInstance: function() {
			if (!instance) {
				instance = new Pubsub()
			}
			return instance;
		}
	};
})