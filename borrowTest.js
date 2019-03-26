var express  = require("express")
var axios  = require("axios")
const timeout = require('connect-timeout');
// const proxy = require('http-proxy-middleware');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');// post 请求
const cors = require('cors')
var app = express();
app.use(cors())
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({extended:false}))
// 这里从环境变量读取配置，方便命令行启动
// HOST 指目标地址
// PORT 服务端口
const { HOST = 'http://hbg.htkj365.com', PORT = '3300' } = process.env;
// 超时时间
const TIME_OUT = 30 * 1e3;
// 设置端口
app.set('port', PORT);
// 设置超时 返回超时响应
app.use(timeout(TIME_OUT));
app.use((req, res, next) => {
  if (!req.timedout) next();
});
app.use('/', express.static('static'));

// 反向代理（这里把需要进行反代的路径配置到这里即可）
// eg:将/api/test 代理到 ${HOST}/api/test
// app.use(proxy('/api/login', { target: HOST }));

// 反向代理（这里把需要进行反代的路径配置到这里即可）
let opts = {
  preserveHostHdr: true,
  reqAsBuffer: true,
//转发之前触发该方法
  proxyReqPathResolver: function(req, res) {
    //这个代理会把匹配到的url（下面的 ‘/api’等）去掉，转发过去直接404，这里手动加回来，
    req.url = req.baseUrl+req.url;
    console.log(1,req)
    return require('url').parse(req.url).path;
  },

}

app.listen(app.get('port'), () => {
  console.log(`server running @${app.get('port')}`);
});



// app.get("/test",(req,res,next)=>{
//   // res.send("test")
//   axios.post(`http://localhost:3300/api/login`,
//     {
//       mobile:"18025407680",password:'liu396165929'
//     }, {
//     headers: { // 修改 header
//       // 'Content-Type': 'application/json',
//       "Referer": "http://hbg.htkj365.com/",
//       "Host": "hbg.htkj365.com",
//       "Origin": "http://hbg.htkj365.com"
//     },
//     params: req.query
//   }).then((response) => {
//     var ret = response.data
//     res.send(ret)
//     // console.log(ret)
//     // res.json(ret)
//   }).catch((e) => {
//     console.log(e)
//     // res.send(JSON.stringify(e))
//     // console.log('error');
//   })
// })
app.use('/api/login', proxy(HOST,opts));

// 使用这个路由
// app.use('/api', proxyMiddlewar(proxyOption))
// var server = app.listen(8081, function () {
 
//   var host = server.address().address
//   var port = server.address().port
 
//   console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
// })
