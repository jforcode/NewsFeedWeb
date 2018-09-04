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
  }
}
