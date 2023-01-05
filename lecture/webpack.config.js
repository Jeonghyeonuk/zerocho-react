const path = require('path');

module.exports = {
	name : 'word-realy-setting', //이름
	mode : 'development', // 실서비스 : production
	devtool : 'eval', // 빠르게해줌
	resolve : {
		extensions : ['.js', '.jsx']
	}, // entry에 파일명 넣을때 확장자 가능하게 만들어줌

	entry : {
		app:['./client'],
	}, // 입력

	module : {
		rules:[{
			test:/\.jsx?/,
			loader:'babel-loader',
			options:{
				presets:['@babel/preset-env', '@babel/preset-react'],
				plugins:['@babel/plugin-proposal-class-properties'],
			},
		}]
	},

	output : {
		path: path.join(__dirname, 'dist'),
		filename: 'app.js'
	},// 출력

};
