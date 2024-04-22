import { TypeTask, TypeTodolist } from "../../../entities/todolist";
import { IDatabaseTodo } from "./i_database_todo";

export class TodoService implements IDatabaseTodo {
  constructor (
    private DBAdapter: IDatabaseTodo
  ) {}

  getAllTasklist(userKey: string): Promise<TypeTodolist> {
    return this.DBAdapter.getAllTasklist(userKey)
  }

  addTasklist(tasklistData: Array<TypeTodolist>): void {
    this.DBAdapter.addTasklist(tasklistData)
  }
  delTasklist(idTasklist: string): void {
    this.DBAdapter.delTasklist(idTasklist)
  }
  
  addTask(idTasklist: string, taskData: TypeTask): void {
    this.DBAdapter.addTask(idTasklist, taskData)
  }
  editTask(idTasklist: string, taskData: TypeTask): void {
    this.DBAdapter.editTask(idTasklist,  taskData)
  }
  delTask(idTasklist: string, idTask: string): void {
    this.DBAdapter.delTask(idTasklist, idTask)
  }
}