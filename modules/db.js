const sqlite3 = require('sqlite3').verbose();
const dbName = "later.sqlite1";

const db = new sqlite3.Database(dbName); // 连接到一个数据库文件

db.serialize(()=> {
  const sql = `CREATE TABLE IF NOT EXISTS articles(id integer primary key, title TEXT, content TEXT)`;
  db.run(sql); // 如果还没有， 创建一个‘articles’表
})

class Article {
  static all(cb) {
    db.all('SELECT * FROM articles', cb); // 获取所以文章
  }
  static find(id, cb) {
    db.all('SELECT * FROM articles WHERE id = ?', id, cb); // 选择一篇指定的文章
  }
  static create(data, cb) {
    const sql = 'INSERT INTO articles(title, content) VALUES (?, ?)';
    db.run(sql, data.title, data.content, cb);
  }
  static delete(id, cb) {
    if (!id) return cb(new Error('please provide an id'));
    db.run('DELETE FROM articles Where id = ?', id, cb);
  }
}

module.exports = db;
module.exports.Article = Article;