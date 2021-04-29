// 设置响应头
async function resHeader(ctx, next) {
    ctx.set("Access-Control-Allow-Origin", "http://10.0.10.216:3008");
    ctx.set("Access-Control-Allow-Credentials", "true");
    ctx.set("Access-Control-Allow-Headers", "Content-Type");
    ctx.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    ctx.set("X-Powered-By", "koa");

    // ctx.set('Content-Security-Policy', "script-src 'self'; report-uri http://10.0.10.216:8688/view/cspReport");
    // ctx.set('X-XSS-Protection', '0');

    // ctx.set('X-Frame-Options', 'deny');

    await next();
}

module.exports = resHeader;