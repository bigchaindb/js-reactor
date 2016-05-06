'use strict';

const path = require('path');

const webpack = require('webpack');
const autoPrefixer = require('autoprefixer');
const combineLoaders = require('webpack-combine-loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

require('dotenv').load({ silent: true });

const PRODUCTION = process.env.NODE_ENV === 'production';
const EXTRACT = process.env.NODE_ENV === 'extract';

const PATHS = {
    APP: path.resolve(__dirname, 'src/app.js'),
    BUILD: path.resolve(__dirname, 'build'),
    DIST: path.resolve(__dirname, 'dist'),
    NODE_MODULES: path.resolve(__dirname, 'node_modules')
};

/** EXTERNAL DEFINITIONS INJECTED INTO APP **/
const DEFINITIONS = {
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
};

/** PLUGINS **/
const PLUGINS = [
    new webpack.DefinePlugin(DEFINITIONS),
    new webpack.NoErrorsPlugin()
];

const EXTRACT_PLUGINS = [
    new ExtractTextPlugin(PRODUCTION ? 'styles.min.css' : 'styles.css', {
        allChunks: true
    })
];

const PROD_PLUGINS = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false
        }
    }),
    new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true
    })
];

if (EXTRACT || PRODUCTION) {
    PLUGINS.push(...EXTRACT_PLUGINS);
}

if (PRODUCTION) {
    PLUGINS.push(...PROD_PLUGINS);
}

/** MODULES **/
const CSS_LOADER = combineLoaders([
    {
        loader: 'css',
        query: {
            sourceMap: true
        }
    },
    { loader: 'postcss' }
]);


/** EXPORTED WEBPACK CONFIG **/
const config = {
    entry: [PATHS.APP],

    output: {
        filename: PRODUCTION ? 'bundle.min.js' : 'bundle.js',
        path: PRODUCTION ? PATHS.DIST : PATHS.BUILD
    },

    debug: !PRODUCTION,

    devtool: PRODUCTION ? '#source-map' : '#inline-source-map',

    resolve: {
        extensions: ['', '.js', '.jsx'],
        modules: ['node_modules'] // Don't use absolute path here to allow recursive matching
    },

    plugins: PLUGINS,

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [PATHS.NODE_MODULES],
                loader: 'babel',
                query: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.css$/,
                exclude: [PATHS.NODE_MODULES],
                loader: PRODUCTION || EXTRACT ? ExtractTextPlugin.extract('style', CSS_LOADER)
                                              : `style!${CSS_LOADER}`
            }
        ]
    },

    postcss: [autoPrefixer()]
};

module.exports = config;
