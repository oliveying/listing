## nodejs 串行化流程
> nodejs 实战
串行任务：需要一个接着一个坐的任务叫做串行任务。

可以使用回调的方式让几个异步任务按顺序执行，但如果任务过多，必须组织一下，否则过多的回调嵌套会把代码搞得很乱。

为了用串行化流程控制让几个异步任务按顺序执行，需要先把这些任务按预期的执行顺序放到一个数组中，这个数组将起到队列的作用：完成一个任务后按顺序从数组中取出下一个。

数组中的每个任务都是一个函数。任务完成后应该调用一个处理器函数，告诉它错误状态和结果。

为了演示如何实现串行化流程控制，我们准备做个小程序，让它从一个随机选择的RSS预定源中获取一篇文章的标题和URL，并显示出来。

需要从npm存储苦衷下载两个辅助模块，在命令行中（以mac系统为例）输入以下命令：
```bash
mkdir listing_2217
cd listing_2217
npm init -y
npm install request
npm install htmlparser
```
request模块是个简化的HTTP客户端，可以获取RSS数据。htmlparser模块能够把原始的RSS数据转换成JavaScript数据结构。

在新目录下创建一个random_story.js文件；
包含rss_feeds.txt

运行 node random_story