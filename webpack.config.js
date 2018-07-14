const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module:{
      rules:[{
          loader:'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
      },
      {
        test:/\.s?css$/,
         //allows us to provide an arry of loader
        use:[
          'style-loader',
          'css-loader',
          'sass-loader' //behind the scene saaa-loader will gonna use node-sass to convert the file
        ]
      }
    ]
  },
  devtool:'cheap-module-eval-source-map',
  devServer:{
    contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  }
};
