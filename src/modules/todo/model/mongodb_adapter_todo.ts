import { MongoClient } from "mongodb";
import { IDatabaseTodo } from "./i_database_todo";
import { TypeTask, TypeTodolist } from "../../../entities/todolist";

export class MongoDBApapterTodo implements IDatabaseTodo {
  private PASSWORD_BD = process.env.PASSWORD_BD
  private USER_BD = process.env.USER_BD
  private urlConnectionBD = `mongodb+srv://${this.USER_BD}:${this.PASSWORD_BD}@users.kodntjx.mongodb.net/?retryWrites=true&w=majority`

  private client = new MongoClient(this.urlConnectionBD)
  private db = 'todoList'
  private collection = 'todoList' 

  async getAllTasklist(userKey: string): Promise<TypeTodolist> {
    try {
      const database = this.client.db(this.db)
      const todolist = database.collection(this.collection)
      // const query = { userKey: userKey }
      const query = { 'userKey': userKey } // Para dados add pelo addtasklist

      return await todolist.find(query).toArray()

    } catch (error) {
      throw new Error(error.message)
    }

    /*
    Vai atualizar a cada mudança no BD (websocket)
      Method (MongoDB API driver Nodejs): watch:
        Create a new Change Stream, watching for new changes (insertions, updates, replacements, deletions, and invalidations) in this collection.
    OU
    Vai ser chamado a cada recarregamento na pagina, quando houver um token valido
  */
  }

  async addTasklist(tasklistData: Array<TypeTodolist>): Promise<void> {
    try {
      const database = this.client.db(this.db)
      const todolist = database.collection(this.collection)

      tasklistData.forEach(async tasklist => await todolist.insertOne(tasklist))

    } catch (error) {
      throw new Error(error.message)
    }
  }
  async delTasklist(idTasklist: string): Promise<void> {
    try {
      const database = this.client.db(this.db)
      const todolist = database.collection(this.collection)
      const query = { 'idTasklist': idTasklist } 

      await todolist.deleteOne(query)

    } catch (error) {
      throw new Error(error.message)
    }
  }
  
  async addTask(idTasklist: string, taskData: TypeTask): Promise<void> {
    try {
      const database = this.client.db(this.db)
      const todolist = database.collection(this.collection)
      const query = { 'idTasklist': idTasklist } 

      const tasklist = (await todolist.findOne(query)).dataTasks
      // console.log('1: ', tasklist)
      tasklist.push(taskData)
      // console.log('2: ', tasklist)
      
      await todolist
        .updateOne(query,{ $set: { 'dataTasks': tasklist } })

    } catch (error) {
      throw new Error(error.message)
    }
  }
  async editTask(idTasklist: string, taskData: TypeTask): Promise<void> {
    try {
      const database = this.client.db(this.db)
      const todolist = database.collection(this.collection)
      const query = { 'idTasklist': idTasklist }

      const tasklist = (await todolist.findOne(query)).dataTasks

      const editedTaskList = tasklist
        .map((task: TypeTask) => {
          if (task.idTask === taskData.idTask) return taskData
          return task
        })

      await todolist
        .updateOne(query,{ $set: { 'dataTasks': editedTaskList } })

    } catch (error) {
      throw new Error(error.message)
    }
  }
  async delTask(idTasklist: string, idTask: string): Promise<void> {
    try {
      const database = this.client.db(this.db)
      const todolist = database.collection(this.collection)
      const query = { 'idTasklist': idTasklist }

      const tasklist = (await todolist.findOne(query)).dataTasks
      const editedTaskList = tasklist
        .filter((task: TypeTask) => String(task.idTask) !== idTask)

      await todolist
        .updateOne(query,{ $set: { 'dataTasks': editedTaskList } })

    } catch (error) {
      throw new Error(error.message)
    }
  }
}