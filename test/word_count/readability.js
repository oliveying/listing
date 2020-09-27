const read = require('node-readability');
const { Article } = require('../../modules/db');

const url = "http://www.manning.com/cantelon2";

read(url, (err, result)=> {

  console.log(result)
})

read(url, (err, result) => {
  Article.create({title: result.title, content: result.content},
    (err, article)=> {
      // 将文章保存在数据库中
  })
})