'use strict';

const restify = require('restify');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

const server = restify.createServer();

server.name = 'gateway';
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.dateParser());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.jsonp());
server.use(restify.plugins.gzipResponse());
server.use(middlewareApplicator(restify.plugins.bodyParser()));
server.use(restify.plugins.conditionalRequest());

server.post('/upload', processUpload);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});

async function processUpload(req, res, next) {
    proxy.web(req, res, {
        target: 'http://backend:8080'
    });
}

function middlewareApplicator(middleware) {
    return function(req, res, next) {
        var regex = /^\/upload.*$/;

        // if url is a proxy request, don't do anything and move to next middleware
        if (regex.test(req.url)) {
            next();
        } else {
            // else invoke middleware
            // some middleware is an array (ex. bodyParser)
            if (middleware instanceof Array) {
                middleware[0](req, res, function() {
                    middleware[1](req, res, next);
                });
            } else {
                middleware(req, res, next);
            }
        }
    };
}
