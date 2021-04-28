const { execSql, handleEscape } = require('../db/mysql');

function createUser({userName, password}) {
    userName = handleEscape(userName);
    password = handleEscape(password);

    const sql = `INSERT INTO users (userName, password) VALUES (${userName}, ${password})`;

    return execSql(sql);
}

function queryUser({userName, password}) {
    const sql = `SELECT * FROM users WHERE userName='${userName}' AND password='${password}'`;

    return execSql(sql);
}

module.exports = {
    createUser,
    queryUser
};