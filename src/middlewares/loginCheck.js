const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config/index');

async function loginCheck(ctx, next) {
    const token = ctx.cookies.get('token');

    if (token) {
        try {
            const decoded = jwt.verify(token, TOKEN_SECRET);
            ctx.request.userInfo = {
                userName: decoded.userName,
                userId: decoded.userId
            };
            await next();
        } catch (err) {
            ctx.body = {
                code: '1',
                msg: err
            }
        }
    } else {
        ctx.body = {
            code: '3004',
            msg: 'unlogin'
        }
    }
}



module.exports = loginCheck;