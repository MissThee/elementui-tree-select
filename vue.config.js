module.exports = {
    publicPath: './',
    configureWebpack: {
        devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'none'
    },
};

