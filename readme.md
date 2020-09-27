# node web 程序的结构

package.json 一个包含依赖项列表和运行这个程序的命令的文件

public/ 静态资源文件夹，css和客户端JavaScript

node_modules 项目依赖项都会装到这里

放程序代码的一个或多个javascrpt文件.

程序代码一般又会分成下面几块

app.js 或index.js 设置程序的代码

modules/ 数据库模型

views/ 用来渲染页面的模版

controllers/ 或routes/ http请求处理器

middleware 中间件组件

