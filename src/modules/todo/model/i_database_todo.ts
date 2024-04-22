import { Todolist, TypeTask } from "../../../entities/todolist"

/*
  Posso definir um type para esse Array<object> e exoorta ele apartir aqui?
  type teste_task = {
    "idTask": string,
    "content": string,
    "status": string
  } 

  type teste = {
    "idTasklist": string,
    "titleTasklist": string,
    "dataTasks": Array<test_task>
  }
*/

export interface IDatabaseTodo {
  getAllTasklist(userKey: string): Promise<Todolist>

  addTasklist(tasklistData: Array<Todolist>): void
  delTasklist(idTasklist: string): void
  
  addTask(idTasklist: string, taskData: TypeTask): void
  editTask(idTasklist: string, taskData: TypeTask): void
  delTask(idTasklist: string, idTask: string): void

}