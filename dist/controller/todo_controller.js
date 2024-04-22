"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerTodo = void 0;
const auth_services_1 = require("../modules/auth/services/auth_services");
const jwt_adapter_1 = require("../modules/auth/services/jwt_adapter");
const mongodb_adapter_todo_1 = require("../modules/todo/model/mongodb_adapter_todo");
const todo_services_1 = require("../modules/todo/model/todo_services");
class ControllerTodo {
    constructor(express) {
        this.express = express;
        this.getAllTokens = () => this.express.getRequest().cookies;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = this.getAllTokens();
                console.log('token: ', token);
                const authAdapter = new jwt_adapter_1.JWTAdapter();
                const tokenIsValid = yield new auth_services_1.AuthUser(authAdapter).isAuth(token);
                console.log('tokenIsValid: ', tokenIsValid);
                if (!tokenIsValid)
                    return this.express
                        .sendResponse(401, { unauthorized: 'Token não autorizado' });
                const DBAdapter = new mongodb_adapter_todo_1.MongoDBApapterTodo();
                const allTasklist = yield new todo_services_1.TodoService(DBAdapter)
                    .getAllTasklist(tokenIsValid.email);
                this.express.sendResponse(200, { allTasklist });
            }
            catch (error) {
                return this.express.sendResponse(500, {
                    method: 'getAll',
                    error: error.message,
                    token: 'invalid'
                });
            }
        });
    }
    addTasklist() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = this.getAllTokens();
                const authAdapter = new jwt_adapter_1.JWTAdapter();
                const tokenIsValid = yield new auth_services_1.AuthUser(authAdapter).isAuth(token);
                if (!tokenIsValid)
                    return this.express
                        .sendResponse(401, { unauthorized: 'Token não autorizado' });
                const body = this.express.getRequest().body;
                const DBAdapter = new mongodb_adapter_todo_1.MongoDBApapterTodo();
                yield new todo_services_1.TodoService(DBAdapter).addTasklist(body);
                this.express.sendResponse(200, { message: 'tasklist add' });
            }
            catch (error) {
                return this.express.sendResponse(500, {
                    method: 'addtasklist',
                    error: error.message,
                    token: 'invalid'
                });
            }
        });
    }
    delTasklist() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = this.getAllTokens();
                const authAdapter = new jwt_adapter_1.JWTAdapter();
                const tokenIsValid = yield new auth_services_1.AuthUser(authAdapter).isAuth(token);
                if (!tokenIsValid)
                    return this.express
                        .sendResponse(401, { unauthorized: 'Token não autorizado' });
                const { idTasklist } = this.express.getRequest().params;
                const DBAdapter = new mongodb_adapter_todo_1.MongoDBApapterTodo();
                yield new todo_services_1.TodoService(DBAdapter).delTasklist(idTasklist);
                this.express
                    .sendResponse(200, { message: `tasklist delete - ${idTasklist}` });
            }
            catch (error) {
                return this.express.sendResponse(500, {
                    method: 'deltasklist',
                    error: error.message,
                    token: 'invalid'
                });
            }
        });
    }
    addTask() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = this.getAllTokens();
                const authAdapter = new jwt_adapter_1.JWTAdapter();
                const tokenIsValid = yield new auth_services_1.AuthUser(authAdapter).isAuth(token);
                if (!tokenIsValid)
                    return this.express
                        .sendResponse(401, { unauthorized: 'Token não autorizado' });
                const { idTasklist } = this.express.getRequest().params;
                const taskData = this.express.getRequest().body;
                const DBAdapter = new mongodb_adapter_todo_1.MongoDBApapterTodo();
                yield new todo_services_1.TodoService(DBAdapter).addTask(idTasklist, taskData);
                this.express.sendResponse(200, { message: 'Task added' });
            }
            catch (error) {
                return this.express.sendResponse(500, {
                    method: 'addtask',
                    error: error.message,
                    token: 'invalid'
                });
            }
        });
    }
    editTask() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = this.getAllTokens();
                const authAdapter = new jwt_adapter_1.JWTAdapter();
                const tokenIsValid = yield new auth_services_1.AuthUser(authAdapter).isAuth(token);
                if (!tokenIsValid)
                    return this.express
                        .sendResponse(401, { unauthorized: 'Token não autorizado' });
                const { idTasklist } = this.express.getRequest().params;
                const taskData = this.express.getRequest().body;
                const DBAdapter = new mongodb_adapter_todo_1.MongoDBApapterTodo();
                yield new todo_services_1.TodoService(DBAdapter).editTask(idTasklist, taskData);
                this.express.sendResponse(200, { message: 'Task edited' });
            }
            catch (error) {
                return this.express.sendResponse(500, {
                    method: 'edittask',
                    error: error.message,
                    token: 'invalid'
                });
            }
        });
    }
    delTask() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = this.getAllTokens();
                const authAdapter = new jwt_adapter_1.JWTAdapter();
                const tokenIsValid = yield new auth_services_1.AuthUser(authAdapter).isAuth(token);
                if (!tokenIsValid)
                    return this.express
                        .sendResponse(401, { unauthorized: 'Token não autorizado' });
                const { idTasklist, idTask } = this.express.getRequest().params;
                const teste = this.express.getRequest().params;
                const DBAdapter = new mongodb_adapter_todo_1.MongoDBApapterTodo();
                yield new todo_services_1.TodoService(DBAdapter).delTask(idTasklist, idTask);
                this.express.sendResponse(200, { message: 'Task deletada' });
            }
            catch (error) {
                return this.express.sendResponse(500, {
                    method: 'deltask',
                    error: error.message,
                    token: 'invalid'
                });
            }
        });
    }
}
exports.ControllerTodo = ControllerTodo;
