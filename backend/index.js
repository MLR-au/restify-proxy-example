'use strict';

const restify = require('restify');
const os = require('os');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const server = restify.createServer();

server.name = 'backend';
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.dateParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.jsonp());
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.conditionalRequest());

server.post('/upload', upload.single(), processUpload);
server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});

function processUpload(req, res, next) {
    console.log(req.files);
    res.send(200);
    next();
}
