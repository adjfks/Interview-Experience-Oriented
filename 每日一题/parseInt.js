/* // 1. 运行结果
console.log(['1', '2', '3', '5', '10'].map(parseInt))

// 2. 如何改写
console.log(['1', '2', '3', '5', '10'].map(passFirstArgument(parseInt)))
 */
console.log(['1', '2', '3', '5', '10'].map(parseInt)) // [ 1, NaN, NaN, NaN, 4 ]
console.log(['1', '2', '3', '5', '10'].map((x) => parseInt(x))) // [ 1, 2, 3, 5, 10 ]
console.log(['1', '2', '3', '5', '10'].map((cur, idx, arr) => parseInt(cur, idx, arr))) // [ 1, NaN, NaN, NaN, 4 ]

// Array.prototype.map扩展
const asciis = Array.prototype.map.call('hello world', (x) => {
	return x.charCodeAt()
})
console.log(asciis) // [104, 101, 108, 108, 111,  32, 119, 111, 114, 108, 100]
