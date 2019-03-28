/**
 * webpack的核心配置文件：执行webpack命令时，会在当前目录查找webpack.config.js文件读取配置
 * 1.通过Commonjs暴露出去一个对象
 * 2.四个关键的概念：
 *    entry：入口文件，将所有打包资源全部引入
 *    output：输出文件，将资源输出到指定目录下
 *    loader：处理webpack不能够解析的模块
 *    plugins：执行loader做不了的任务
 * 3.如何找到自己想要的loader？
 *   优先去官网找自己想要的loader，没有再去npm官网上找。
 * 4.在终端输入：webpack ./src/js/app.js ./build/js/built.js
 *  问题：这种方式只能够编译打包js、json文件，其他文件处理不了
 * 5.webpack --display-modules可以查看隐藏的任务
 */
//path内置的模块，用来设置路径。
const {resolve} = require('path');
//引入插件----提取css为一个单独的文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//清空文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin')
//引入通用配置
const common = require('./webpack.common')
//引入合并库
const merge = require('webpack-merge')

module.exports = merge(common,{

  //配置所有的loader
  module: {
    rules: [
      {
        test: /\.less$/, //匹配文件的规则，说明该loader对哪个文件生效
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",//如果插件失效，则执行此句话
          use: ["css-loader","less-loader"]
        })
      },
    ]
  },

  //配置所有的插件
  plugins: [
    //提取css为单独文件
    new ExtractTextPlugin("./css/index.css"),
    //清空文件夹
    new CleanWebpackPlugin()
  ]


});