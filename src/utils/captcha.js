const svgCaptcha = require('svg-captcha');
const captchaCache = {};

// 生成图形验证码
function genCaptcha(ctx) {
    const captcha = svgCaptcha.create();
    const userInfo = ctx.request.userInfo;
    captchaCache[userInfo.userId] = captcha.text.toLowerCase();
    console.log(captchaCache)
    return captcha.data;
}

// 验证图形验证码
function validateCaptcha(ctx, data) {
    const userInfo = ctx.request.userInfo;
    if(!captchaCache[userInfo.userId] || !data) {
        return false;
    }
    console.log(captchaCache)
    return captchaCache[userInfo.userId] === data.toLowerCase();
}

module.exports = {
    genCaptcha,
    validateCaptcha
}