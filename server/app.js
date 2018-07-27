const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('koa-weapp-demo')
const response = require('./middlewares/response')
const bodyParser = require('koa-bodyparser')
const config = require('./config')
const path = require('path');
const koastatic = require('koa-static');

// 使用响应处理中间件
app.use(response)

// 解析请求体
app.use(bodyParser())
//配置静态文件
const static = koastatic(path.join(__dirname,"static/"));
app.use(static);
// 引入路由分发
const router = require('./routes')
app.use(router.routes())

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
