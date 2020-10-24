const path = require('path');

function resolve(name) {
    return path.resolve(__dirname,name)
}
module.exports = {
    publicPath: './',
    configureWebpack: {
        devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'none'
    },
};

