import { ControllerTodo } from "../../controller/todo_controller"
import { ExpressAdapter, typeReq, typeRes, RouterAdapter } from "../express/express_adapter"

export const todoRouter = new RouterAdapter().init()

// GetAll
todoRouter.get('/', (req: typeReq, res: typeRes) => {
  const expressAdapter = new ExpressAdapter(req, res)
  new ControllerTodo(expressAdapter).getAll()
})

// taskList
todoRouter.post('/tasklist', (req: typeReq, res: typeRes) => {
  const expressAdapter = new ExpressAdapter(req, res)
  new ControllerTodo(expressAdapter).addTasklist()
})

todoRouter.delete('/tasklist/:idTasklist', (req: typeReq, res: typeRes) => {
  const expressAdapter = new ExpressAdapter(req, res)
  new ControllerTodo(expressAdapter).delTasklist()
})

// task
todoRouter.post('/task/:idTasklist', (req: typeReq, res: typeRes) => {
  const expressAdapter = new ExpressAdapter(req, res)
  new ControllerTodo(expressAdapter).addTask()
})

todoRouter.delete('/task/:idTasklist/:idTask', (req: typeReq, res: typeRes) => {
  const expressAdapter = new ExpressAdapter(req, res)
  new ControllerTodo(expressAdapter).delTask()
})

todoRouter.put('/task/:idTasklist', (req: typeReq, res: typeRes) => {
  const expressAdapter = new ExpressAdapter(req, res)
  new ControllerTodo(expressAdapter).editTask()
})