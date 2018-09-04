var debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

var getNumberSuffix = function (number) {
	if (!number) return "";
	switch (number % 10) {
		case 1: return "st";
		case 2: return "nd";
		case 3: return "rd";
		default: return "th";
	}
};

var getUrl = function (url) {
	return url.startsWith('http', 'https')
		? url : 'https://' + url;
}

module.exports = {
	debounce,
	getNumberSuffix,
	getUrl
};
