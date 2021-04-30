// 验证请求头origin属性
async function originValidator(ctx, next) {
    const origin = ctx.request.headers.origin;

    console.log(origin);

    const reg = /^http:\/\/10.0.10.216:8688/;
    if(!reg.test(origin)) {
        ctx.body = {
            code: '1',
            msg: '非法请求'
        }
        return;
    }
    await next();
}

module.exports = originValidator;