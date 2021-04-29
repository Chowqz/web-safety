const router = require('koa-router')();
const { getCommentList } = require('../../controller/comment');
const loginCheck = require('../../middlewares/loginCheck');

router.get('/login', async (ctx, next) => {
    await ctx.render('login')
});

router.get('/index', loginCheck, async (ctx, next) => {
    const userName = ctx.query.userName;
    const result =  await getCommentList({
        pageIndex: 0,
        pageSize: 10
    });
    await ctx.render('index', {
        commentList: result.commentList,
        userName
    })
});


router.post('/cspReport',  async (ctx, next) => {
    
    ctx.body = ctx.request.body;
});

module.exports = router;