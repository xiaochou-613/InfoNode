/**
 * 部署我的项目
 * 
 *   问题 1 ： 没有安装cors，并未处理跨域问题，好像不存在  --已解决
 * 
 */
const cors = require('cors')
const express = require('express')
const history = require('connect-history-api-fallback')
const app = express()
const path = require('path')
const router = require('./router/plan')
const routerMusic = require('./router/music')
const routerNav = require('./router/nav')
const routerPerson = require('./router/person')           
const bodyParser = require('body-parser');


//解析表单数据 - 并加大传输限制
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())
app.use(bodyParser.json({ limit: '3mb' }));
app.use(bodyParser.urlencoded({ limit: '3mb', extended: true }));

//解决跨域问题 -- 域名、端口不一样都可能存在
app.use(cors()) 

//history 
app.use(history())
app.use(express.static(path.join(__dirname, './static')))


app.use('/api',router,routerMusic,routerNav,routerPerson)


app.listen(8080, () => {
  console.log('running...at http://127.0.0.1:8080');  
})