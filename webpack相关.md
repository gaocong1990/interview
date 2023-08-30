## 是什么
webpack 是一个用于现代JavaScript应用程序的`静态模块`打包工具
## 能力
1. `编译代码`能力，提高效率，解决浏览器兼容问题
2. `模块整合`能力，提高性能，可维护性，解决浏览器频繁请求文件的问题
3.  支持不同种类的前端模块类型(css/png)，统一的模块化方案，所有资源文件的加载都可以通过代码控制,项目维护性增强

## 运行流程
webpack 的运行流程是一个串行的过程，它的工作流程就是将各个插件串联起来

从启动到结束会依次执行以下三大步骤：

1. 初始化流程：从配置文件和 Shell 语句中读取与合并参数，并初始化需要使用的插件和配置插件等执行环境所需要的参数
2. 编译构建流程：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理
3. 输出流程：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统

## loader
loader 用于对模块的"源代码"进行转换，在 import 或"加载"模块时预处理文件

在webpack内部中，任何文件都是模块，不仅仅只是js文件

默认情况下，在遇到import或者require加载模块的时候，webpack只支持对js 和 json 文件打包

像css、sass、png等这些类型的文件的时候，webpack则无能为力，这时候就需要配置对应的loader进行文件内容的解析

配置方式如下：
  ```javascript
  module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            { loader: 'sass-loader' }
          ]//调用顺序：sass-loader==>css-loader====>style-loader
        }
      ]
    }
  };
  ```
常见的loader: 
  - `babel-loader`: 用babel来转换ES6文件到ES
  - `css-loader` `sass-loader` `less-loader` `postcss-loader` `style-loader`处理css
  - `html-minify-loader`: 压缩HTML
  - `url-loader`: 把图片转成 base64 格式的字符串，并打包到 js 中，对小体积的图片比较合适

## Plugin
在Webpack中，插件（plugin）是一个非常强大且灵活的扩展机制，它允许你在Webpack构建过程的各个阶段执行自定义操作。插件是一个具有特定接口的JavaScript对象，它通过订阅Webpack编译器（compiler）的事件钩子（hooks）来实现对构建过程的定制。

简单来说，插件是Webpack构建流程中的一种扩展，它可以让你在构建过程中的特定时机执行自定义操作，以满足特定的需求。

常见的插件：
- HtmlWebpackPlugin：⾃动生成⼀个 html ⽂文件，并把打包生成的js 模块引⼊到该 html 中
- copy-webpack-plugin：复制public目录到dist文件夹中
- MiniCssExtractPlugin：将CSS从JavaScript中提取出来，生成单独的CSS文件

## Loader和Plugin的区别
- loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中
- plugin 赋予了 webpack 各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决 loader 无法实现的其他事

## 如何借助webpack来优化前端性能
- 通过各种loader和plugin进行：JS代码压缩、CSS代码压缩、Html压缩、文件大小压缩、图片压缩
- 配置TreeShaking，减小打包体积
- splitChunksPlugin： 将代码分离到不同的bundle中，之后我们可以按需加载，或者并行加载这些文件
- InlineChunkHtmlPlugin：内联chunk，将一些chunk的模块内联到html

## 如何提高webpack的构建速度
- 优化loader配置： 如开启`babel-loader?cacheDirectory`缓存
- 使用 cache-loader：在一些性能开销较大的 loader之前添加 cache-loader，以将结果缓存到磁盘里，显著提升二次构建速度
- TerserPlugin 启动多线程
- 合理使用 sourceMap