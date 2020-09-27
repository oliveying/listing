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

## npm 运行脚本

通常node server.js 是默认的start命令，所以在package.json的script里可以省略，前提是必须要有server.js

比如选了Mocha来做测试，并且已经用npm install --save-dev 装好来，如果在package.json中添加下面的语句，就不用全局安装了
```json
{
  ...
  "scripts": {
    "test": "./node_modules/.bin/mocha test/*.js"
  }
}
```

这个例子中的参数传给了mocha，也可以在运行npm脚本时用两个连字符传入参数：
```bash
npm testo -- test/*.js
```

## npm 常用命令

* start,  启动web应用服务器
* stop,  停掉web应用服务器
* restart, 运行stop，然后运行restart
* install , postinstall 在安装了包之后运行本地构建命令。注意，postinstall只能通过npm *run* postinstall运行

还有发布包之前清理命令

以及用于包迁移时前置/后置命令