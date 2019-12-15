module.exports = {  
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, 
        use: { 
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [ "html-loader" ]
      },
      {
        test: /\.(svg|png|jpg|gif|css)$/,
        use: [ "file-loader" ]        
      }
    ]
  }
}