const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  devtool: 'eval', // 서비스일때는 hidden-source-map
  resolve: {
    extensions: ['.js', '.jsx'],
  }, // entry에 파일명 넣을때 확장자 가능하게 만들어줌

  entry: {
    app: './client',
  }, // 입력

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 5% in KR', 'last 2 chrome versions']
            },
            /* preset-env 가 최신코드가 IE 같은곳에서 안돌아갈때 그걸 자동으로 돌아가게 바꿔주는건데, 
            여기서 targets 속성을 사용해서 내가 지원하고자 하는 브라우저를 따로 선택해줄수있다.
            이걸 정해주지않으면 모든 브라우저를 지원하게되고 그렇게되면 속도가 느려진다*/
          }],
          '@babel/preset-react'
        ],
        plugins: [],
      },
    }],
  }, // 설정

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
  ], //추가작업

  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
  }, //출력
}