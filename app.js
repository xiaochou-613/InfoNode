/**
 * 部署我的项目
 * 
 *   问题 1 ： 没有安装cors，并未处理跨域问题，好像不存在  --已解决
 * 
 */
const cors = require('cors');
const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// 路由文件
const router = require('./router/plan');
const routerMusic = require('./router/music');
const routerNav = require('./router/nav');
const routerDiary = require('./router/diary');
const routerPerson = require('./router/person');

// 数据库连接
const db = require('./mySQL');

// 解析表单数据 - 并加大传输限制
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json({ limit: '3mb' }));
app.use(bodyParser.urlencoded({ limit: '3mb', extended: true }));

// 解决跨域问题
app.use(cors());

// 使用 history 模式
// app.use(history());   *****他妈的已开启就在mac上用不了*****

// 静态文件服务（如果有前端静态资源需要加载）
app.use(express.static(path.join(__dirname, './static')));

// 日志中间件
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}, Method: ${req.method}`);
  next();
});

// 注册路由
app.use('/api', router, routerMusic, routerNav, routerPerson, routerDiary);


// 启动服务
app.listen(8080, () => {
  console.log('Server running at http://127.0.0.1:8080');
});