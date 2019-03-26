var express  = require("express")
var app = express()
// import axios from "axios"
var axios  = require("axios")
var request = require('request');
var http = require("http");
var url = require("url")



// app.get('/', function (req, res,next) {
//   // axios.get("https://dev.xiaobuke.com/recommend/category").then(r=>{
//   //   let a = JSON.stringify(r)
//   //   res.send(a)

//   // })
//   request('./index.html',function(error,response,body){
//     /*判断请求是否成功*/
//     if (!error && response.statusCode == 200) {
//         /*把字符串转换为json*/
//         // var data=JSON.parse(body);
//         /*渲染模板*/
//         res.send( body);
//     }
// });
// })
function start(route,handle){
  function onRequest(request, response) {
    // console.log("Request received.");
    if(request.url === '/favicon.ico') return;//阻止响应
    var pathname = url.parse(request.url).pathname
    var text = route(handle,pathname);
    response.writeHead(200, {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With",
      "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS",
      "X-Powered-By":' 3.2.1'
    });
    response.write(text);
    response.end();
  }
  http.createServer(onRequest).listen(3000);
  console.log("Server has started , listening 3000")
}
exports.start = start;
