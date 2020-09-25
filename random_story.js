const fs = require('fs');
const request = require('request');

const htmlparser = require('htmlparser');

const configFilename = './rss_feeds.txt';

function checkForRssFile() {
  fs.existsSync(configFilename, (exists) => {
    if (!exists) {
      return next(new Error(`missing rss file: ${configFilename}`))
    }
    next(null, configFilename);
  })
}

function readRSSFile(configFilename) {
  fs.readFileSync(configFilename, (err, feedlist) => {
    console.log(feedlist, 'feedlist')
    if (err) return next(err);
    feedlist = feedlist.toString().replace('/^\s+|\s+$/g', '').split('\n');
    const random = Math.floor(Math.random()* feedlist.length);
    next(null, feedlist[random]);
  })
}

function downloadRSSFeed(feedurl) {
  request({url: feedurl}, (err,res, body) =>{
    if (err) return next(err);
    if (res.statusCode !== 200) {
      return next(new Error('Abnormal response status code'));
    }
    next(null, body);
  })
}

function parseRSSFeed(rss) {
  const handler = new htmlparser.RssHandler();
  const parser = new htmlparser.Parser(handler);
  parser.parseComplete(rss);
  if (!handler.dom.items.length) {
    return next(new Error('No RSS items found'));
  }
  const item = handler.dom.items.shift();
  console.log(item.title);
  console.log(item.link);

}
const tasks = [
  checkForRssFile,
  readRSSFile,
  downloadRSSFeed,
  parseRSSFeed
]
function next(err, result) {
  if (err) throw err;
  const currentTask = tasks.shift();
  if (currentTask) {
    currentTask(result);
  }
}
next();