"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const auth_controller_1 = require("../../controller/auth_controller");
const express_adapter_1 = require("../express/express_adapter");
exports.authRouter = new express_adapter_1.RouterAdapter().init();
exports.authRouter.post('/login', (req, res) => {
    const expressAdapter = new express_adapter_1.ExpressAdapter(req, res);
    new auth_controller_1.ControllerAuth(expressAdapter).login();
});
exports.authRouter.post('/signUp', (req, res) => {
    const expressAdapter = new express_adapter_1.ExpressAdapter(req, res);
    new auth_controller_1.ControllerAuth(expressAdapter).signUp();
});
exports.authRouter.get('/verifytoken', (req, res) => {
    const expressAdapter = new express_adapter_1.ExpressAdapter(req, res);
    new auth_controller_1.ControllerAuth(expressAdapter).verifyToken();
});
exports.authRouter.get('/logOut', (req, res) => {
    const expressAdapter = new express_adapter_1.ExpressAdapter(req, res);
    new auth_controller_1.ControllerAuth(expressAdapter).logOut();
});
