const router = require('koa-router')();
const { getCommentList } = require('../../controller/comment');
const loginCheck = require('../../middlewares/loginCheck');
const { randomString } = require('../../utils/index');
const { genCaptcha } = require('../../utils/captcha');

router.get('/login', async (ctx, next) => {
    await ctx.render('login')
});

router.get('/index', loginCheck, async (ctx, next) => {
    const csrfToken = randomString(16);
    const captcha =  genCaptcha(ctx);

    const userName = ctx.query.userName;
    const result =  await getCommentList({
        pageIndex: 0,
        pageSize: 10
    });

    ctx.cookies.set('csrfToken', csrfToken)

    await ctx.render('index', {
        commentList: result.commentList,
        userName,
        csrfToken,
        captcha
    })
});


router.post('/cspReport',  async (ctx, next) => {
    
    ctx.body = ctx.request.body;
});

module.exports = router;