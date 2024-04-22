"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const todo_controller_1 = require("../../controller/todo_controller");
const express_adapter_1 = require("../express/express_adapter");
exports.todoRouter = new express_adapter_1.RouterAdapter().init();
// GetAll
exports.todoRouter.get('/', (req, res) => {
    const expressAdapter = new express_adapter_1.ExpressAdapter(req, res);
    new todo_controller_1.ControllerTodo(expressAdapter).getAll();
});
// taskList
exports.todoRouter.post('/tasklist', (req, res) => {
    const expressAdapter = new express_adapter_1.ExpressAdapter(req, res);
    new todo_controller_1.ControllerTodo(expressAdapter).addTasklist();
});
exports.todoRouter.delete('/tasklist/:idTasklist', (req, res) => {
    const expressAdapter = new express_adapter_1.ExpressAdapter(req, res);
    new todo_controller_1.ControllerTodo(expressAdapter).delTasklist();
});
// task
exports.todoRouter.post('/task/:idTasklist', (req, res) => {
    const expressAdapter = new express_adapter_1.ExpressAdapter(req, res);
    new todo_controller_1.ControllerTodo(expressAdapter).addTask();
});
exports.todoRouter.delete('/task/:idTasklist/:idTask', (req, res) => {
    const expressAdapter = new express_adapter_1.ExpressAdapter(req, res);
    new todo_controller_1.ControllerTodo(expressAdapter).delTask();
});
exports.todoRouter.put('/task/:idTasklist', (req, res) => {
    const expressAdapter = new express_adapter_1.ExpressAdapter(req, res);
    new todo_controller_1.ControllerTodo(expressAdapter).editTask();
});
