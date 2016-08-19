module.exports = {
  entry: './client/main.js',
  output: {
        filename: "bundle.js",
        path: __dirname + '/webpacked_coded'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
}
