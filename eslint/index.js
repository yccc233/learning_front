function merge () {
	var ret = {};
	a++;
	for (var i in arguments) {
		var m = arguments[i];
		console.log(i)
		for (var j in m) {
			console.log(j);
			ret[j] = m[j];
		}
	}
	return ret;
}

console.log("最终结果：", merge({a: 123}, {b: 456}));