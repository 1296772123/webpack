/*
*
* dev环境的配置文件
* */

//path内置的模块，用来设置路径。
const {resolve} = require('path');
//引入插件----提取css为一个单独的文件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//自动成成html文件，并自动引入资源
const HtmlWebpackPlugin = require('html-webpack-plugin');
//清空文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin')
//引入webpack
const webpack = require('webpack');
//引入通用配置
const common = require('./webpack.common')
//引入合并库
const merge = require('webpack-merge')


module.exports = merge(common,{
  //入口（从哪里进入开始解析）
  entry:['./src/js/index.js','./src/index.html'],

  //出口（最终加工完的代码输出到哪里）
  output: {// 输出配置
    path: resolve(__dirname, '../build'),//输出文件路径配置
    filename: 'index.js',// 输出文件名
  },

  //配置所有的loader
  module: {
    rules: [
      //1.将less转成css
      {
      test: /\.less$/, //匹配项目中所有的less文件
      use: [{
        loader: 'style-loader' // 动态生成一个style标签，然后把css模块注入进来
      }, {
        loader: 'css-loader' // 将css打包成一个CommonJs的模块
      }, {
        loader: 'less-loader' // 将less转css
      }]
    },
      /*{
        test: /\.less$/, //匹配文件的规则，说明该loader对哪个文件生效
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",//如果插件失效，则执行此句话
          use: ["css-loader","less-loader"]
        })
      },*/
      //5.使用html-loader（为了支持热模替换）
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        }
      }
    ]
  },

  //配置所有的插件
  plugins: [
    //开启模块热更新
    new webpack.HotModuleReplacementPlugin()
  ],

  //配置devserver
  devServer: {
    hot: true, //模块热更新（热模替换）
    open:true, //是否自动帮开发人员打开浏览器
    port:3001, //dev服务器的端口号
    compress:true //是否开启gzip
  }


});