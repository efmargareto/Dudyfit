const path = require('path');

module.exports = {
  entry: './js/app.js',
  output: {
    filename: './bundle.js',
    path: path.join(__dirname, '/'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};