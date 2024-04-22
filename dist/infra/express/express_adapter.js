"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterAdapter = exports.ExpressAdapter = void 0;
const express_1 = require("express");
class ExpressAdapter {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    getRequest() {
        return this.req;
    }
    sendResponse(status, data) {
        this.res.status(status).json(data);
    }
    sendResponseWithCookieToken(token, options) {
        this.res.cookie('token', token, options);
    }
}
exports.ExpressAdapter = ExpressAdapter;
class RouterAdapter {
    init() {
        return (0, express_1.Router)();
    }
}
exports.RouterAdapter = RouterAdapter;
