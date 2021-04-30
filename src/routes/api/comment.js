const router = require('koa-router')();
const { addComment, getCommentList } = require('../../controller/comment');
const loginCheck = require('../../middlewares/loginCheck');
const csrfTokenValidator = require('../../middlewares/csrfTokenValidator');
const originValidator = require('../../middlewares/originValidator');
const { validateCaptcha } = require('../../utils/captcha');

router.prefix('/comment');

router.post('/addComment', loginCheck, async (ctx, next) => {
    const { content, captcha } = ctx.request.body;
    // if(!validateCaptcha(ctx, captcha)) {
    //     ctx.body = {
    //         code: '1',
    //         msg: '验证码验证不通过'
    //     };
    //     return;
    // }
    const userInfo = ctx.request.userInfo;
    ctx.body = await addComment({ content, authorId: userInfo.userId });
});

router.get('/newComment', loginCheck, async (ctx, next) => {
    // console.log(ctx.request.query);
    // console.log(ctx.query);
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