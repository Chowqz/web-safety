const { execSql, handleEscape, sqlLimit } = require('../db/mysql');

function createComment({content, authorId}) {
    content = handleEscape(content);

    const sql = `INSERT INTO comments (content, authorId) VALUES (${content}, ${authorId})`;

    return execSql(sql);
}

function queryComment({pageIndex, pageSize}) {
    let sql = `SELECT a.id, a.content, a.authorId, b.userName AS authorName, DATE_FORMAT( a.createTime, '%Y-%m-%d %H:%i:%S' ) AS createTime, DATE_FORMAT( a.updateTime, '%Y-%m-%d %H:%i:%S' ) AS updateTime FROM comments a LEFT JOIN users b ON a.authorId = b.id ORDER BY a.createTime desc`;
    sql += `${sqlLimit(pageIndex, pageSize)};`
    return execSql(sql);
}

module.exports = {
    createComment,
    queryComment
};