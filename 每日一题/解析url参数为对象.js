const parseUrl = (url) => {
	if (typeof url !== 'string') return new Error('the url must be string')
	// https://www.baidu.com:80/files/file1/#paragraph1?username=zs&age=20
	url = url.trim()
	const params = url.split('?')[1]
	return params.split('&').reduce((pre, cur) => {
		let [key, value] = cur.split('=') // 根据=分隔为数组并解构
		// 判断是否有值
		if (value) {
			value = decodeURIComponent(value) // 解码
			value = /^\d+$/.test(value) ? parseFloat(value) : value // 判断是否为数字
			pre[key] = value
			return pre
		}
	}, {})
}

const params = parseUrl('https://www.baidu.com:80/files/file1/#paragraph1?username=zs&age=20')
console.log(params)
console.log(params.age)
console.log(typeof params.age)
console.log(params.username)
