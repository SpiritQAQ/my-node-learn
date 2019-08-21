function start(){
  console.log("request handler 'start' was called")
  return "Hello start "
}
function upload(){
  console.log("request handler 'upload' was called")
  return "Hello upload "
  
}
function index(){
  console.log("request handler 'index' was called")
  return "Hello index "
  
}
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '123456',
  port:3306,
  database : 'test'
 });
 connection.connect();
 var allData  = []
 connection.query('select * from xbk_theme_book', function(err, rows, fields) {
  if (err) throw err;
  // console.log(fields)
  // for(var i= 0,usr;usr=rows[i++];){
  //     // console.log('user nae='+usr.name + ', password='+usr.password);
  //     // console.log(usr)
  //     data.push(usr)
  // }
  allData = rows 
 });

function getJingduList(){
  let data  = []
  allData
  if(data.length>0){
    return JSON.stringify(data)
  }else{
    return '数据为空'
  }
}
function themesList(){
  let themeNameList = []
  // return JSON.stringify(allData)
  let result = []
  allData.forEach(item=>{
    if(themeNameList.indexOf(item.THEME)==-1){//如果list中不存在该主题
      result.push(
        {
          theme:item.THEME,
          themeText:item.THEME_TEXT,
          guide:item.GUIDE,
          guidePic:item.GUIDE_PIC,
          paint:item.PAINT,
          paintPic:item.PAINT_PIC,
          story:item.STORY,
          storyPic:item.STORY_PIC,
          family:item.FAMILY,
          familyPic:item.FAMILY_PIC,
          interact:item.INTERACT,
          interactPic:item.INTERACT_PIC,
          bookList:[]
        }
      )
      themeNameList.push(item.THEME)
    }
  })
  // allData.forEach(item=>{
  //   result.forEach(t=>{
  //     if(item.THEME == t.theme){
  //       t.bookList.push({

  //       })
  //     }
  //   })
  // })
  // return JSON.stringify(themeNameList)
  return JSON.stringify(result)
  // let result = []
  // list.forEach((i,idx) =>{
  //   result.push({themeName:i,bookList:[]})
  // })
  // allData.forEach(item=>{
  //   result.forEach(i=>{
  //     if(i.themeName == item.THEME){
  //       i.bookList.push(item)
  //     }
  //   })
  // })
  // return JSON.stringify(result)

}
exports.start = start 
exports.upload = upload 
exports.index = index 
exports.getJingduList = getJingduList
exports.themesList = themesList