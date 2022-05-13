function debounce(func, wait) {
	var timerId, lastThis, lastArgs

	formatArgs()
	return debounced

	function formatArgs() {
		if (typeof func !== 'function') {
			throw new Error('Expected a function')
		}
		wait = +wait || 0
	}

	function timeExpired() {
		return invokeFunc()
	}

	function invokeFunc() {
		var args = lastArgs,
			thisArg = lastThis
		lastArgs = lastThis = undefined
		func.apply(thisArg, args)
	}

	function startTimer(time) {
		return setTimeout(timeExpired, time)
	}

	function debounced() {
		lastThis = this
		lastArgs = arguments
		clearTimeout(timerId)
		timerId = startTimer(wait) // 开启定时器
	}
}
