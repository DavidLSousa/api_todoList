import { TypeTask } from "../entities/todolist";
import { IHttpContext } from "../infra/express/i_http_context";
import { AuthUser } from "../modules/auth/services/auth_services";
import { JWTAdapter } from "../modules/auth/services/jwt_adapter";
import { MongoDBApapterTodo } from "../modules/todo/model/mongodb_adapter_todo";
import { TodoService } from "../modules/todo/model/todo_services";

export class ControllerTodo {
  constructor(
    private express: IHttpContext
  ) {}

  getAllTokens = () => this.express.getRequest().cookies

  async getAll () {
    try {
      const { token } = this.getAllTokens()
      console.log('token: ', token)

      const authAdapter = new JWTAdapter()
      const tokenIsValid = await new AuthUser(authAdapter).isAuth(token)
      console.log('tokenIsValid: ', tokenIsValid)
      if (!tokenIsValid) return this.express
        .sendResponse(401, { unauthorized: 'Token não autorizado' })

      const DBAdapter = new MongoDBApapterTodo()
      const allTasklist = await new TodoService(DBAdapter)
        .getAllTasklist(tokenIsValid.email)

      this.express.sendResponse(200, { allTasklist })
    } catch (error) {
      return this.express.sendResponse(500, { 
        method: 'getAll', 
        error: error.message,
        token: 'invalid'
      })
    }
  }

  async addTasklist(): Promise<void> {
    try {
      const { token } = this.getAllTokens()

      const authAdapter = new JWTAdapter()
      const tokenIsValid = await new AuthUser(authAdapter).isAuth(token)
      if (!tokenIsValid) return this.express
        .sendResponse(401, { unauthorized: 'Token não autorizado' })
        
      const body = this.express.getRequest().body

      const DBAdapter = new MongoDBApapterTodo()
      await new TodoService(DBAdapter).addTasklist(body)

      this.express.sendResponse(200, { message: 'tasklist add' })
    } catch (error) {
      return this.express.sendResponse(500, { 
        method: 'addtasklist', 
        error: error.message,
        token: 'invalid'
      })
    }
  }
  async delTasklist(): Promise<void> {
    try {
      const { token } = this.getAllTokens()

      const authAdapter = new JWTAdapter()
      const tokenIsValid = await new AuthUser(authAdapter).isAuth(token)
      if (!tokenIsValid) return this.express
        .sendResponse(401, { unauthorized: 'Token não autorizado' })

      const { idTasklist } = this.express.getRequest().params

      const DBAdapter = new MongoDBApapterTodo()
      await new TodoService(DBAdapter).delTasklist(idTasklist)

      this.express
        .sendResponse(200, { message: `tasklist delete - ${idTasklist}` })
    } catch (error) {
      return this.express.sendResponse(500, { 
        method: 'deltasklist', 
        error: error.message,
        token: 'invalid'
      })
    }
  }
  
  async addTask(): Promise<void> {
    try {
      const { token } = this.getAllTokens()


      const authAdapter = new JWTAdapter()
      const tokenIsValid = await new AuthUser(authAdapter).isAuth(token)
      if (!tokenIsValid) return this.express
        .sendResponse(401, { unauthorized: 'Token não autorizado' })
      
      const { idTasklist } = this.express.getRequest().params
      const taskData: TypeTask = this.express.getRequest().body

      const DBAdapter = new MongoDBApapterTodo()
      await new TodoService(DBAdapter).addTask(idTasklist, taskData)

      this.express.sendResponse(200, { message: 'Task added' })
    } catch (error) {
      return this.express.sendResponse(500, { 
        method: 'addtask', 
        error: error.message,
        token: 'invalid'
      })
    }
  }
  async editTask(): Promise<void> {
    try {
      const { token } = this.getAllTokens()


      const authAdapter = new JWTAdapter()
      const tokenIsValid = await new AuthUser(authAdapter).isAuth(token)
      if (!tokenIsValid) return this.express
        .sendResponse(401, { unauthorized: 'Token não autorizado' })
      
      const { idTasklist } = this.express.getRequest().params
      const taskData: TypeTask = this.express.getRequest().body

      const DBAdapter = new MongoDBApapterTodo()
      await new TodoService(DBAdapter).editTask(idTasklist, taskData)

      this.express.sendResponse(200, { message: 'Task edited' })
    } catch (error) {
      return this.express.sendResponse(500, { 
        method: 'edittask', 
        error: error.message,
        token: 'invalid'
      })
    }
  }
  async delTask(): Promise<void> {
    try {
      const { token } = this.getAllTokens()

      const authAdapter = new JWTAdapter()
      const tokenIsValid = await new AuthUser(authAdapter).isAuth(token)
      if (!tokenIsValid) return this.express
        .sendResponse(401, { unauthorized: 'Token não autorizado' })

      const { idTasklist, idTask } = this.express.getRequest().params
      const teste = this.express.getRequest().params

      const DBAdapter = new MongoDBApapterTodo()
      await new TodoService(DBAdapter).delTask(idTasklist, idTask)

      this.express.sendResponse(200, { message: 'Task deletada' })
    } catch (error) {
      return this.express.sendResponse(500, { 
        method: 'deltask', 
        error: error.message,
        token: 'invalid'
      })
    }
  }
}