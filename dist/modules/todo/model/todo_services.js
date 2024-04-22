"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
class TodoService {
    constructor(DBAdapter) {
        this.DBAdapter = DBAdapter;
    }
    getAllTasklist(userKey) {
        return this.DBAdapter.getAllTasklist(userKey);
    }
    addTasklist(tasklistData) {
        this.DBAdapter.addTasklist(tasklistData);
    }
    delTasklist(idTasklist) {
        this.DBAdapter.delTasklist(idTasklist);
    }
    addTask(idTasklist, taskData) {
        this.DBAdapter.addTask(idTasklist, taskData);
    }
    editTask(idTasklist, taskData) {
        this.DBAdapter.editTask(idTasklist, taskData);
    }
    delTask(idTasklist, idTask) {
        this.DBAdapter.delTask(idTasklist, idTask);
    }
}
exports.TodoService = TodoService;
