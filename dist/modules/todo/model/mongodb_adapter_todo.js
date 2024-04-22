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
exports.MongoDBApapterTodo = void 0;
const mongodb_1 = require("mongodb");
class MongoDBApapterTodo {
    constructor() {
        this.PASSWORD_BD = process.env.PASSWORD_BD;
        this.USER_BD = process.env.USER_BD;
        this.urlConnectionBD = `mongodb+srv://${this.USER_BD}:${this.PASSWORD_BD}@users.kodntjx.mongodb.net/?retryWrites=true&w=majority`;
        this.client = new mongodb_1.MongoClient(this.urlConnectionBD);
        this.db = 'todoList';
        this.collection = 'todoList';
    }
    getAllTasklist(userKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const database = this.client.db(this.db);
                const todolist = database.collection(this.collection);
                // const query = { userKey: userKey }
                const query = { 'userKey': userKey }; // Para dados add pelo addtasklist
                return yield todolist.find(query).toArray();
            }
            catch (error) {
                throw new Error(error.message);
            }
            /*
            Vai atualizar a cada mudança no BD (websocket)
              Method (MongoDB API driver Nodejs): watch:
                Create a new Change Stream, watching for new changes (insertions, updates, replacements, deletions, and invalidations) in this collection.
            OU
            Vai ser chamado a cada recarregamento na pagina, quando houver um token valido
          */
        });
    }
    addTasklist(tasklistData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const database = this.client.db(this.db);
                const todolist = database.collection(this.collection);
                tasklistData.forEach((tasklist) => __awaiter(this, void 0, void 0, function* () { return yield todolist.insertOne(tasklist); }));
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    delTasklist(idTasklist) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const database = this.client.db(this.db);
                const todolist = database.collection(this.collection);
                const query = { 'idTasklist': idTasklist };
                yield todolist.deleteOne(query);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    addTask(idTasklist, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const database = this.client.db(this.db);
                const todolist = database.collection(this.collection);
                const query = { 'idTasklist': idTasklist };
                const tasklist = (yield todolist.findOne(query)).dataTasks;
                // console.log('1: ', tasklist)
                tasklist.push(taskData);
                // console.log('2: ', tasklist)
                yield todolist
                    .updateOne(query, { $set: { 'dataTasks': tasklist } });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    editTask(idTasklist, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const database = this.client.db(this.db);
                const todolist = database.collection(this.collection);
                const query = { 'idTasklist': idTasklist };
                const tasklist = (yield todolist.findOne(query)).dataTasks;
                const editedTaskList = tasklist
                    .map((task) => {
                    if (task.idTask === taskData.idTask)
                        return taskData;
                    return task;
                });
                yield todolist
                    .updateOne(query, { $set: { 'dataTasks': editedTaskList } });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    delTask(idTasklist, idTask) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const database = this.client.db(this.db);
                const todolist = database.collection(this.collection);
                const query = { 'idTasklist': idTasklist };
                const tasklist = (yield todolist.findOne(query)).dataTasks;
                const editedTaskList = tasklist
                    .filter((task) => String(task.idTask) !== idTask);
                yield todolist
                    .updateOne(query, { $set: { 'dataTasks': editedTaskList } });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.MongoDBApapterTodo = MongoDBApapterTodo;
