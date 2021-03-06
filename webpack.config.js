module.exports = {
    entry: './src/app/index.js',
    output: {
        path: __dirname + '/src/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.(js)$/,
            exclude: /node_modules/,
            options: { presets: ['@babel/env', '@babel/preset-react'], }
        },
        {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          } ]
    }
};