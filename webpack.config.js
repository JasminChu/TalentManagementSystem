const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: false,
    mode: 'development',
    entry: {
        admin: './static/js/indexAdmin.js', //This one is for the admin not the main page
        wp_login: './static/js/login.js',
        leader: './static/js/indexLeader.js',
        interview: './static/js/pendingInterview.js',
        allRequests: './static/js/allRequests.js',
        leaderHistory: './static/js/leaderHistory.js',
        main: './static/js/main.js',
        style: './static/css/style.css'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', // instead of style-loader
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],

    }
};
