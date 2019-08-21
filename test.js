const express = require('express')
const request = require('request-promise')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 4000
let HEADERS = {
  'Accept': 'application/json, text/plain, */*',
  "Cookie":"JSESSIONID=0E0799F37F884EB0CCB3C97CA0E88D5B",
  'Content-Type': 'application/x-www-form-urlencoded',
  'Origin': 'http://hbg.htkj365.com',
  'Referer': 'http://hbg.htkj365.com/',
  'Host': 'hbg.htkj365.com',
  'User-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
}

async function fetch(methods="get",url, res,data) {
  try {
    res.json(await request({
      method:methods,
      uri: url,
      json: true,
      headers: HEADERS,
      body:data
    }))
    // console.log(res.headers)
  } catch(e) {
    res.json({ error: e})
  }
}

app.use(cors())

//login 
let userInfo = {mobile:"18025407680",password:"liu396165929"}
let r 
let cookie
// console.log(formData)
request({
  method:"post",
  uri:"http://hbg.htkj365.com/api/login",
  json:true,
  headers: HEADERS,
  form:userInfo,
  resolveWithFullResponse: true  //Get the full response instead of just the body
}).then((response)=>{
  cookie = response.headers['set-cookie']
  cookie = cookie[0].split(";")[0]
  HEADERS.Cookie = cookie
  console.log(HEADERS.Cookie )
  HEADERS["Content-Type"]='application/json;charset=UTF-8'
}
  
)

// app.get('/login', async (req, res) => {
//   const url = `http://hbg.htkj365.com/api/login`
//   fetch("post",url, res)
// })
app.get('/getLibrarys', async (req, res) => {
  const url = `http://hbg.htkj365.com/api/library/employee/get/now/libraryList`
  fetch("post",url, res)
})
app.get(`/borrowing`, async (req, res) => {
  // console.log(req.originalUrl.split("id="))
  let ID = req.originalUrl.split("id=")[1]
  const url = `http://hbg.htkj365.com/api/libraryfinance/card/instance/get/borrowing`
  fetch("post",url, res,{id:ID})
})
// app.get('/', async (req, res) => {
//   const url = `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${+ new Date()}`
//   fetch(url, res)
// })
// )

// app.get('/lyrics', async (req, res) => {
//   const { id, type } = req.query
//   const url = `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?nobase64=1&musicid=${id}&songtype=${type || 0}`  
//   try {
//     let text = (await request({
//       uri: url,
//       headers: {
//         'accept': '*/*',
//         'authority': 'c.y.qq.com',
//         'referer': 'https://c.y.qq.com',
//         'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
//       }
//     })).replace(/MusicJsonCallback\((.*)\)/, '$1')
//     res.json(JSON.parse(text))
//   } catch(e) {
//     res.json({ error: e.message })
//   }
// })

app.listen(PORT)