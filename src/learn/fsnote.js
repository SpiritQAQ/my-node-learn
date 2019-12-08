var fs = require('fs')

// const note1Text = fs.readFileSync('note1.js', 'utf8');
const note1Text = fs.readFile('note1.js', 'utf8', (err, data) => {
  console.log(data)
});
console.log(note1Text)
console.log('Task End')