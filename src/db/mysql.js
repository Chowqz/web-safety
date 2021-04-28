const mysql = require('mysql');
const { MYSQL_CONF } = require('../config/db');

const connection = mysql.createConnection(MYSQL_CONF);

connection.connect(err => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('connect to database successfully');
});

function execSql(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    })
}

function sqlLimit (pageIndex = 0, pageSize = 10) {
    const pageOffset = parseInt(pageSize) * parseInt(pageIndex);
    return ` LIMIT ${pageOffset}, ${parseInt(pageSize)}`;
}

module.exports = {
    execSql,
    handleEscape: mysql.escape,
    sqlLimit
}