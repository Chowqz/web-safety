const { createComment, queryComment } = require('../service/comment');

async function addComment({ content, authorId }) {
    try {
        const result = await createComment({ content, authorId: authorId });
        return {
            code: '0',
            msg: 'success'
        }
    } catch (err) {
        return {
            code: '1',
            msg: err
        }
    }
}

async function getCommentList({pageIndex, pageSize}) {
    try {
        const result = await queryComment({pageIndex, pageSize});
        return {
            code: '0',
            msg: 'success',
            commentList: result
        }
    } catch (err) {
        return {
            code: '1',
            msg: err
        }
    }
}

module.exports = {
    addComment,
    getCommentList
}