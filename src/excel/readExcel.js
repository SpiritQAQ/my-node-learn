var xlsx = require('xlsx');
var fs = require('fs')
var excelObj = xlsx.readFile('./DL.xlsx', {
  type: 'file',
});
// console.log("excelObj,Sheet1", excelObj.Sheets.Sheet1)
// console.log("excelObj,Sheet2", excelObj.Sheets.Sheet2)

const idList = excelObj.Sheets.Sheet1
const DLList = excelObj.Sheets.Sheet2

Object.keys(DLList).forEach(DLItem => {
  let bookName = DLList[DLItem].v


    Object.keys(idList).forEach(idItem => {
      if (!!bookName && bookName === idList[idItem].v) {
        // console.log("bookName", bookName)
        const idKey = `A${idItem.slice(1)}`
        console.log("newKey", idList[idKey].v)
        const newKey = `C${DLItem.slice(1)}`

        DLList[newKey] = {...idList[idKey]}
      }


      })
  })

  console.log("excelObj", excelObj)

const wopts = {
  BookType: 'xlsx', // file type to be generated

  Booksst: false, // whether to generate a shared string table. The official explanation is that if enabled, the generation speed will decrease, but it has better compatibility on IOS devices with lower versions

  type: 'binary',
};
fs.unlink(`result.xlsx`, () => {
  xlsx.writeFile(excelObj, `result.xlsx`);
});



