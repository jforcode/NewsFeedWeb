const errors = {
	INVALID_FILTER: {
		code: "INVALID_FILTER",
		desc: "Invalid Filter Value. It should be an instance of Filter."
	},
	KEY_ALREADY_EXISTS: {
		code: "KEY_ALREADY_EXISTS",
		desc: "Can't add filter. A filter with given key already exists."
	},
	INVALID_TYPE_AND_KEY: {
		code: "INVALID_TYPE_AND_KEY",
		desc: "Filter with given type and key not found."
	}
};

var Filter = function (type, key, displayValue, extra, onRemoveHandler) {
	this.type = type;
	this.key = key;
	this.displayValue = displayValue;
	this.extra = extra;
	this.onRemoveHandler = onRemoveHandler;
};

// can remove setKeys
var FiltersHolder = function () {
	this.mapTypeToFilters = {};
	this.setKeys = {};
	this.countFilters = 0;

	this.addFilter = function (filter) {
		if (!(filter instanceof Filter) || !filter.type || !filter.key) {
			throw errors.INVALID_FILTER;
		}
		if (this.setKeys[filter.key]) {
			throw errors.KEY_ALREADY_EXISTS;
		}
		var filters = this.mapTypeToFilters[filter.type];
		if (!filters) {
			filters = [];
			this.mapTypeToFilters[filter.type] = filters;
		}

		var len = filters.push(filter);
		this.setKeys[filter.key] = true;
		this.countFilters++;
	},

	this.removeFilter = function (type, key) {
		if (!this.setKeys[key] || !this.mapTypeToFilters[type]) {
			throw errors.INVALID_TYPE_AND_KEY;
		}

		var ind = this.mapTypeToFilters[type].findIndex(item => item.key === key);
		if (ind === -1) {
			throw errors.INVALID_TYPE_AND_KEY;
		}

		var filter = this.mapTypeToFilters[type].splice(ind, 1)[0];
		if (filter.onRemoveHandler instanceof Function) {
			filter.onRemoveHandler();
		}

		delete this.setKeys[key];
		this.countFilters--;
	},
	
	this.getFilter = function (type, key) {
		if (!this.setKeys[key] || !this.mapTypeToFilters[type]) {
			return null;
		}

		return this.mapTypeToFilters[type].find(item => item.key === key);
	},
	
	this.getFilters = function (type) {
		return this.mapTypeToFilters[type];
	},

	this.getAllFilters = function () {
		var ret = [];
		for (var x in Object.getOwnPropertyNames(this.mapTypeToFilters)) {
			ret = ret.concat(this.mapTypeToFilters[x]);
		}
		return ret;
	},

	this.getCountFilters = function () {
		return this.countFilters;
	}
}

module.exports = {
	Filter,
	FiltersHolder
}