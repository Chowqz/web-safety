const router = require('koa-router')();
const { addComment, getCommentList } = require('../../controller/comment');
const loginCheck = require('../../middlewares/loginCheck');

router.prefix('/comment');

router.post('/addComment', loginCheck, async (ctx, next) => {
    const { content } = ctx.request.body;
    const userInfo = ctx.request.userInfo;
    ctx.body = await addComment({ content, authorId: userInfo.userId });
});

router.get('/newComment', loginCheck, async (ctx, next) => {
    console.log(ctx.request.query);
    console.log(ctx.query);
    const { content } = ctx.query;
    const userInfo = ctx.request.userInfo;
    ctx.body = await addComment({ content, authorId: userInfo.userId });
});


router.post('/getCommentList', loginCheck, async (ctx, next) => {
    const { pageIndex, pageSize } = ctx.request.body;
    ctx.body = await getCommentList({ 
        pageIndex: pageIndex || 0, 
        pageSize: pageSize || 1000 
    });
});


module.exports = router;