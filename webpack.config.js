
const path = require('path');
const webpack = require('webpack');   //导入webpack模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: {
        main: __dirname + '/src/main.js',//多入口配置
    },
    output: {
        publicPath: "./",
        filename: 'js/[name].min.js', //js文件会生成在dist/js下
        path: path.resolve(__dirname, 'dist'),//打包后的文件存放的地方  会在wepack下生成dist目录
    },
    // watch: true,  // 监听修改自动打包
    // resolve: {
    //     // extensions: [".tsx", ".ts", ".js", ".jsx", ".css", ".scss"]
    // },
    module: {
        rules: [
            {
                //转换es6语法
                test: /(\.jsx|\.js)$/,
                use: "babel-loader",
                exclude: path.resolve(__dirname, "node_modules"),
                include: path.resolve(__dirname, "src")
            },
            {
                test: /\.(css|scss|sass)$/,  // 用正则去匹配要用该 loader 转换的 CSS 文件
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require("autoprefixer") /*在这里添加*/
                            ]
                        }
                    }, 'sass-loader'

                ]
            },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,//正则表达式匹配图片规则
                use: [{
                    loader: 'url-loader',
                    options: {
                        publicPath: '../',
                        limit: 8192,//限制打包图片的大小：
                        //如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
                        name: 'image/[name].[ext]',//css中的images图片将会打包在build/image下;
                    }
                }]
            },
        ]
    },

    //插件
    plugins: [
        // new webpack.HotModuleReplacementPlugin(), //热更新
        new MiniCssExtractPlugin({
            filename: "css/[name].min.css",
            // filename: "css/[chunkhash:12].[name].css",
            chunkFilename: "css/[id].css"
        }),
        new HtmlWebpackPlugin({
            title: "进化树",  //生成的html title名字，在模板文件中用  <title><%= htmlWebpackPlugin.options.title %></title>调用即可
            chunks: ['main'],  //引入entry中的key名字的js文件，此处为main，打包后html后会自动引入main.js文件
            filename: 'index.html', // bulid目录下生成的html文件名
            template: 'src/index.html' // 我们原来的index.html路径，作为模板
        })
    ],
    mode: 'production', // 设置 development、production、none
    // devServer: {
    //     "publicPath": './',
    //     "port": 3000
    // }
};