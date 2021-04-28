const router = require('koa-router')();
const { register, login } = require('../../controller/user');

router.prefix('/user');

router.post('/register', async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    ctx.body = await register({ userName, password });
});

router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body;

    ctx.body = await login(ctx, { userName, password });
});

module.exports = router;