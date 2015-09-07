/*
*路径可以配置绝对路径
*用了路径配置后fis3失败
*配置，使用require，定义define，载入require，导出 return{}
**/

// require.config({
// 	baseUrl: 'static/js/mod/',
// 	paths: {
// 		'mod_a': 'index.index.mod.a.js'
// 	}
// });

require(['static/js/mod/index.index.mod.a.js'], function(calc) {
	console.log('in');
	document.getElementById('J_btn').onclick = function() {
		console.log(calc.min(5, 7));
	};
});