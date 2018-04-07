var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:9000',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
            $:  'jquery',
            jQuery: 'jquery'
        })
    ],

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        loaders: [
		    {
           test: /\.jsx?$/,
           loaders: ['react-hot-loader/webpack', 'babel-loader'],
           include: path.join(__dirname, 'src')
        },
        {
			test:   /\.css$/,
			loader: "style-loader!css-loader"
        },
        { test: /\.woff(\d+)?$/,
			use: {
			loader: 'url-loader',
					options: {prefix: 'font',
							  limit: 5000,
							  mimetype: 'application/font-woff'
							  }
				}
		},
        { test: /\.ttf$/,
			use: {loader: 'file-loader',
					options: {prefix: 'font' }
				 }
		},
        { test: /\.eot$/,
			use: {loader: 'file-loader',
					options: {prefix: 'font' }
				 }
		},
        { test: /\.svg$/,
			use: {loader: 'file-loader',
					options: {prefix: 'font' }
				 }
		}
      ]
    }

};
