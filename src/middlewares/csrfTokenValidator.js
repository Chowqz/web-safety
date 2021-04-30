// 验证csrfToken
async function csrfTokenValidator(ctx, next) {
    const { csrfToken } = ctx.request.body;
    if(!csrfToken) {
        ctx.body = {
            code: '1',
            msg: 'csrfToken不能为空'
        };
        return;
    }
    if(csrfToken !== ctx.cookies.get('csrfToken')) {
        ctx.body = {
            code: '1',
            msg: 'csrfToken错误'
        }
        return;
    }

    await next();
}

module.exports = csrfTokenValidator;