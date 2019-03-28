/*
* 该配置是生产环境配置
* */
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
//引入webpack
const webpack = require('webpack')
//压缩css
const CleanCSSPlugin = require("less-plugin-clean-css");
//自动成成html文件，并自动引入资源，并压缩html
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common,{

  //出口（最终加工完的代码输出到哪里）
  output: {// 输出配置
    path: resolve(__dirname, '../dist'),//出口的路径
    filename: './js/[name].[hash:10].js'
  },

  //配置所有的loader
  module: {
    rules: [
      {
        test: /\.less$/, //匹配文件的规则，说明该loader对哪个文件生效
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",//如果插件失效，则执行此句话
          use: ["css-loader","postcss-loader",{
            loader: "less-loader", options: {
              plugins: [
                new CleanCSSPlugin({
                  advanced: true //删除注释和换行和空格
                })
              ]
            }
          }]
        })
      },
    ]
  },

  //配置所有的插件
  plugins: [
    //提取css为单独文件
    new ExtractTextPlugin("./css/[name].[hash:10].css"),
    //清空文件夹
    new CleanWebpackPlugin(),
    //压缩js
    new webpack.optimize.UglifyJsPlugin({
      sourceMap:true //资源映射文件
    }),
    new HtmlWebpackPlugin({
      title:"1130", //配置html文件中的title标签(暂时无效)
      filename:"index.html",//生成html的文件名
      template:"./src/index.html",//生成html文件依赖的模板
      minify:{
        removeComments:true, //移除注释
        collapseWhitespace:true//移除换行、空格。。。
      }
    }),
  ],
  //支持资源映射
  devtool:'source-map'


});