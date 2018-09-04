export default {
  debounce: function (func, wait, immediate) {
  	let timeout = null
  	return function () {
  		let context = this,
        args = arguments,
        later = function() {
    			timeout = null
    			if (!immediate) func.apply(context, args)
    		},
        callNow = immediate && !timeout

      clearTimeout(timeout)
  		timeout = setTimeout(later, wait)
  		if (callNow) func.apply(context, args)
  	}
  },

  getNumberSuffix: function (number) {
  	if (!number) return ""
  	switch (number % 10) {
  		case 1: return "st"
  		case 2: return "nd"
  		case 3: return "rd"
  		default: return "th"
  	}
  },

  getUrl: function (url) {
  	return url.startsWith('http', 'https') ? url : 'https://' + url
  }

}
