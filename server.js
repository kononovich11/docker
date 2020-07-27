const koa = require('koa');
const Router = require('koa-router');
const Joi = require('joi');
const bodyParser = require('koa-bodyparser');
const db = require('@paralect/node-mongo').connect("mongodb://mongo/docker");

const app = new koa();
const router = new Router();

app.use(bodyParser());

const users = [];

const userService = db.createService('users');
const logsService = db.createService('logs');


router.get('/me', async (ctx, next) => {
  ctx.body = await userService.find();
});

router.post('/logs', async (ctx, next) => {
  ctx.body = await logsService.create({
    event: ctx.request.body.event
  });
});

router.get('/logs', async (ctx, next) => {
  ctx.body = await logsService.find();
});
// const schema = Joi.object({
//   firstName: Joi.string().required(),
//   lastName: Joi.string().required(),
//   age: Joi.number(),
// });


// router.get('/me', (ctx, next) => {
//   ctx.body = users;
//   console.log('GET!!!!!');
// });

// router.post('/users', async (ctx, next) => {
//   const user = schema.validate(ctx.request.body);
//   users.push(user);
//   console.log(user);
// });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8082); 