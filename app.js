const Koa = require('koa'); // koa 2.x
const router = require('koa-simple-router');
const serve = require('koa-static');
const path = require('path');
const render = require('koa-swig');//模板
// koa v2.x
var co = require('co');
let app = new Koa();

app.context.render = co.wrap(render({
  root: path.join(__dirname, 'views'),
  autoescape: true,
  cache: 'memory', // disable, set to false
  ext: 'html',
  writeBody:true
}));




app.use(router(_ => {
  _.get('/', (ctx, next) => {
    ctx.body = 'hello';
  })
  _.get('/index', async(ctx, next) => {
    ctx.body=await ctx.render('index.html');
  })
}))

app.use(serve(path.join(__dirname , '/public')));

app.listen(3000,()=>{
	console.log('Server Started')
});