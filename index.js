const express = require('express');
const bodyparser = require('body-parser');

const app = express();

const Article = require('./modules/db').Article;
app.set('port', process.env.PORT || 3000)

app.use(bodyparser.json()); // 支持编码为json的消息请求消息体
app.use(bodyparser.urlencoded({extended: true})); // 支持编码为表单的请求消息体
// const articles = [{title: "example"}]
app.get('/', (req,res) => {
  res.send('hello world')
})

app.get('/articles', (req,res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err);
    res.send(articles);
  })
})

app.post('/articles', (req,res, next) => {
  const article = { title: req.body.title };
  articles.push(article);
  res.send(article);
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