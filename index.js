const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.set('port', process.env.PORT || 3000)

app.use(bodyparser.json()); // 支持编码为json的消息请求消息体
app.use(bodyparser.urlencoded({extended: true})); // 支持编码为表单的请求消息体
const articles = [{title: "example"}]
app.get('/', (req,res) => {
  res.send('hello world')
})

app.get('/articles', (req,res, next) => {
  res.send(articles)
})

app.post('/articles', (req,res, next) => {
  const article = { title: req.body.title };
  articles.push(article);
  res.send(article);
})

app.get('/articles/:id', (req,res, next) => {
  const id = req.params.id;
  console.log('fetcing: ', id);
  res.send(articles[id])
});

app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('deleting: ' + id);
  delete articles[id];
  res.send({message: 'delete'});
})

app.listen(app.get('port'), () => {
  console.log(`express web app available at localhost: ${app.get('port')}`);
})

module.exports = app;