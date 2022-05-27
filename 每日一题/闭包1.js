function test() {
	var i = 0
	return function () {
		var j = 0
		++i
		++j
		console.log(i * j)
	}
}

var f1 = test()
var f2 = test()
f1()
f1()
f2()
