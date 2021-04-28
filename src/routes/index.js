const path = require('path');
const fs = require('fs');
const router = require('koa-router')();

function initRouter(routeType) {
    const routerFile = fs.readdirSync(path.join(__dirname, `/${routeType}`));

    routerFile.map(fileItem => {
        const childRouter = require(`./${routeType}/${fileItem}`);
        router.use(`/${routeType}`, childRouter.routes(), childRouter.allowedMethods());
    })
}

initRouter('api');
initRouter('view');

module.exports = router;