const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const articles = [{title: "example"}]
app.get('/', (req,res) => {
  res.send('hello world')
})

app.get('/articles', (req,res, next) => {
  res.send(articles)
})

app.post('/articles', (req,res, next) => {
  res.send('ok')
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

app.listen(port, () => {
  console.log(`express web app available at localhost: ${port}`);
})

module.exports = app;