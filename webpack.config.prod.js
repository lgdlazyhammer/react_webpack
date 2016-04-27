var path = require('path');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

var config = {
    entry: './app/main.js',
    output: {
        path: __dirname+'build',
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            loader: 'babel', // 加载模块 "babel" 是 "babel-loader" 的缩写,
            query: {
                presets: ["es2015", "react"]
            }
        },{
        // Test expects a RegExp! Note the slashes!
        test: /\.css$/,
        loaders: ['style', 'css'],
        // Include accepts either a path or an array of paths.
        include: PATHS.app
      },{
        // Test expects a RegExp! Note the slashes!
        test: /\.json$/,
        loader: 'json'
      }]
    }
};

module.exports = config;