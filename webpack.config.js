let webpack = require('webpack');
let path = require('path');

let babelOptions = {
    "presets": ["es2015", "stage-0"]
};

module.exports = {
    entry:
        {
            index: ['babel-polyfill', './init.ts']
        },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'js')
    },
    target: "node",
    module: {
        rules: [{
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: babelOptions
                },
                {
                    loader: 'ts-loader'
                }
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: babelOptions
                }
            ]
        }]
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};
