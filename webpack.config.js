'use strict';
const path = require('path');

module.exports = {
    entry: './public/index.ts',
    devtool: 'inline-source-map',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [ '.ts' ]
    }
}
