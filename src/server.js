//1. 导入express
var express = require('express')

//2. 加载模块
var bodyParse = require('body-parser')

const PluginSojsonV7 = require('./plugin/sojsonv7.js')

let port = 9999
if (process.argv[2] != null && process.argv[2] > 0) {
  port = process.argv[2]
}

//3. 创建服务器
var server = express()

server.get('/', function (request, response) {
  response.send('hello world')
})

//4. 生成解析器
// application/x-www-form-urlencoded
// var urlencoded = bodyParse.urlencoded({ extends:true })

// application/json
// var jsonParser = bodyParse.json()

//5. 中间件: 把请求体参数 存放到request.body
server.use('/decode', bodyParse.text())

//6. 请求数据
// request:request请求头,请求体
server.post('/decode', function (request, response) {
  var code = PluginSojsonV7(request.body)
  if (code == null) {
    response.send('')
    return
  }
  response.send(code)
})

//7. 绑定端口
server.listen(port)

console.log(`node server start: http://127.0.0.1:${port}`)