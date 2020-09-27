const express = require('express');
const bodyparser = require('body-parser');
const read = require('node-readability');
const app = express();

const Article = require('./modules/db').Article;
app.set('port', process.env.PORT || 3000)

app.use(bodyparser.json()); // 支持编码为json的消息请求消息体
app.use(bodyparser.urlencoded({extended: true})); // 支持编码为表单的请求消息体

app.use('./css/bootstrap.css', express.static('node_modules/bootstrap/dist/css/bootstrap.css'))
// const articles = [{title: "example"}]
app.get('/', (req,res) => {
  res.send('hello world')
})

app.get('/articles', (req,res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err);
    res.format({
      html: ()=> {
        res.render('articles.ejs', {
          articles: articles,
        })
      },
      json: ()=> {
        res.send(articles);
      }
    })
  })
})

app.post('/articles', (req,res, next) => {
  const url = req.body.url;
  read(url, (err, result)=> {
    if (err || !result) res.status(500).send('error downloading article');

    Article.create({title: result.title, content: result.content},
      (err, article) => {
        if (err) return next(err);
        res.send('OK'); // 文章保存成功后，发送状态码为200的响应
      })
  });
})

app.get('/articles/:id', (req,res, next) => {
  const id = req.params.id;
  Article.find(id, (err, article) => {
    if (err) return next(err);
    res.send(article);
    console.log('fetcing: ', id);
  })
  
});

app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('deleting: ' + id);
  Article.delete(id, (err, article) =>{
    if (err) return next(err);
    res.send({message: 'deleted'});
  })
})

app.listen(app.get('port'), () => {
  console.log(`express web app available at localhost: ${app.get('port')}`);
})

module.exports = app;