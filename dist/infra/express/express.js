"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const router_1 = require("../routers/router");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
(0, dotenv_1.config)();
exports.app = (0, express_1.default)();
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
exports.app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5503');
    res.setHeader('Access-Control-Allow-Methods', ['GET', 'POST', 'PUT', 'DELETE']);
    res.setHeader('Access-Control-Allow-Headers', ['Content-Type']);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
// app.get('/cookie', (req, res) => {
//   res.cookie('cookieTest', 'test', { httpOnly: true, maxAge: 30 * 60 * 10000 })
//   const { cookies } = req
//   // console.log(req)
//   console.log(cookies)
//   res.status(200).json({ 'cookie': cookies })
// })
exports.app.use(router_1.router);
