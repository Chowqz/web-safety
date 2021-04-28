// 设置响应头
async function resHeader(ctx, next) {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Headers", "Content-Type");
    ctx.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    ctx.set("X-Powered-By", "koa");

    ctx.set('X-XSS-Protection', '1');
    await next();
}

module.exports = resHeader;