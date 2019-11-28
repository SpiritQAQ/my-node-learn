var QRCode   = require('qrcode')
var fs = require('fs');
var xlsx = require('node-xlsx');

var sheets = xlsx.parse('./test.xlsx');
// console.log(sheets[0].data[0][0])
let imgArr = []
var i = 0

function createQrcode(str,idx) {
  if (idx > sheets[0].length) return `console.log(${idx}张图片已全部完成)`
  QRCode.toDataURL(`${str}`, { width: 512,height: 512,version: 3 })
  .then(url => {
    console.log(`${idx}.png二维码已经生成`)

    base64_decode(url, idx)

  })
  .catch(err => {
    console.error(err)
  })
}


// sheets[0].data.forEach((item,idx) => {
//   // createQrcode(item[0], idx)
// })
console.time('allTime')
// for (var i=0; i<sheets[0].data.length;i++) {
// async() => {
  // for (var i=0; i<1000;i++) {
    createQrcode(sheets[0].data[0][0], 0)
  // }
// }

console.timeEnd('allTime')



function base64_decode(base64str, idx) {
  // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
  var base64Data = base64str.replace(/^data:image\/png;base64,/, "")
  var bitmap = new Buffer(base64Data, 'base64');
  // write buffer to file
  imgArr.push(bitmap)
  fs.writeFile(`./imgs/${idx+1}.png`, bitmap,(err) => {
    if(err) {
      return console.log(`${file}写入失败，原因${err}`)
    }
  });
  console.log(`******** ${idx+1}.png created from base64 encoded string ********`);
  createQrcode(sheets[0].data[idx+1][0], idx+1)
}
