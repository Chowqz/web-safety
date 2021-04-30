const { createUser, queryUser } = require('../service/user');
const jwt = require('jsonwebtoken');
const { genPassword } = require('../utils/crypto');
const { TOKEN_SECRET } = require('../config/index');

async function register({ userName, password }) {
    password = genPassword(password);
    try {
        await createUser({ userName, password });
        return {
            code: '0',
            msg: 'success'
        };
    } catch (err) {
        return {
            code: '1',
            msg: err
        }
    }
}

async function login(ctx, { userName, password }) {
    password = genPassword(password);

    try {
        const userInfo = await queryUser({ userName, password });

        if(!userInfo.length) {
            return {
                code: '1',
                msg: '用户名不存在或密码错误'
            }
        }

        const payload = {
            userName: userInfo[0].userName,
            userId: userInfo[0].id
        };

        const token = jwt.sign(payload, TOKEN_SECRET, {
            expiresIn: '24h'
        });

        ctx.cookies.set('token', token, {
            maxAge: 3600 * 1000 * 24,
            httpOnly: false,
            // sameSite: 'Lax'
        })

        return {
            code: '0',
            msg: 'success',
            // userInfo,
            token
        }
    } catch (err) {
        return {
            code: '1',
            msg: err
        }
    }
}

module.exports = {
    register,
    login
}