const fs = require('fs');
const tasks = [];
const wordCounts = {};
const filesDir = './text';
let completedTasks = 0;

function checkIfComplete() {
  completedTasks++;
  console.log(completedTasks, tasks, 'ddd')
  if (completedTasks === tasks.length) {
    for (let index in wordCounts) {
      console.log(`${index}: ${wordCounts[index]}`)
    }
  } 
}

function addWordCount(word) {
  wordCounts[word] = wordCounts[word] ? wordCounts[word] + 1: 1;
}

function countWordsInText(text) {
  const words = text.toString().toLowerCase().split(/\W+/).sort();

  words.filter(word=>word).forEach((word)=> {
    console.log(word, 'hellosd')
    addWordCount(word);
  })
}

fs.readdir(filesDir, (err, files) => {
  console.log(files, 'files')
  if (err) throw err;
  files.forEach(file=> {
    const task = (file => {
      return () => {
        fs.readFile(file, (err,text) => {
          console.log(1111)
          if (err) throw err;
          countWordsInText(text);
          checkIfComplete();
        })
      }
    })(`${filesDir}/${file}`);
    console.log(task, 'task')
    tasks.push(task);

  });
  tasks.forEach(task => task())
})