"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_adapter_1 = require("../express/express_adapter");
const router_auth_1 = require("./router_auth");
const router_todolist_1 = require("./router_todolist");
exports.router = new express_adapter_1.RouterAdapter().init();
exports.router.use('/auth', router_auth_1.authRouter);
exports.router.use('/todolist', router_todolist_1.todoRouter);
