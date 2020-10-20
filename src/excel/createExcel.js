const fs = require('fs');
const XLSX = require('xlsx');

const uids = [];
const UID_NUMBER = 100;

for (let i = 0; i < UID_NUMBER; i++) {
  uids.push([900000 + Math.floor(Math.random() * 100000)]);
}

const ws = XLSX.utils.aoa_to_sheet(uids);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
// const workbook = {
//   SheetName: ['sheet1'],
//   Sheets: {
//     sheet1: ws,
//   },
// };
// Generating configuration items of Excel

const wopts = {
  BookType: 'xlsx', // file type to be generated

  Booksst: false, // whether to generate a shared string table. The official explanation is that if enabled, the generation speed will decrease, but it has better compatibility on IOS devices with lower versions

  type: 'binary',
};
fs.unlink(`${UID_NUMBER}_uids.xlsx`, () => {
  XLSX.writeFile(wb, `${UID_NUMBER}_uids.xlsx`, wopts);
});
