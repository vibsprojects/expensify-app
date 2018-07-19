const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');
  // console.log(env);

  return {
      entry: './src/app.js',
      output: {
        path: path.join(__dirname, 'public','dist'),
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
            use : CSSExtract.extract({
              use:[
                {
                    loader:'css-loader',
                    options:{
                      sourceMap : true
                    }
                }
                ,
                {
                  loader:'sass-loader', //behind the scene saaa-loader will gonna use node-sass to convert the file
                  options:{
                    sourceMap : true
                  }
                }                
              ]
            })
          }
        ]
      },
      plugins:[
          CSSExtract
      ],
      devtool: isProduction ? 'source-map' :  'inline-source-map',
      devServer:{
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        publicPath:'/dist/'
      }
  }
};

//package.json
// "live-server": "^1.2.0",
// "serve": "live-server public/",