const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    // 根据不同的执行环境配置不同的入口
    entry: './src/components/tree-select/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'tree-select.js',
        library: 'element-ui-tree-select', // 指定使用require时的模块名
        libraryTarget: 'umd', // 指定输出格式
        umdNamedDefine: true // 会对 UMD 的构建过程中的 AMD 模块进行命名。否则就使用匿名的 define
    },
    module: {
        rules: [
            {//处理.vue文件
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {//处理文件中css代码
                test: /\.css$/,
                use: [ 'vue-style-loader','style-loader','css-loader'],
            },
            // {
            //     test: /\.(woff|ttf)$/,
            //     use: ['file-loader']
            // }
        ],
    },
    plugins: [
        //VueLoaderPlugin：这个插件是必须的！ 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块
        //如果未使用此插件，.vue文件中引用的其他组件无法识别，编译出错
        new VueLoaderPlugin()
    ],
}