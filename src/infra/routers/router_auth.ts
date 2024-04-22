import { ControllerAuth } from "../../controller/auth_controller"
import { 
  ExpressAdapter, 
  typeReq, 
  typeRes, 
  RouterAdapter 
} from "../express/express_adapter"


export const authRouter = new RouterAdapter().init()

authRouter.post('/login', (req: typeReq, res: typeRes) => {
  const expressAdapter = new ExpressAdapter(req, res)
  new ControllerAuth(expressAdapter).login()
})

authRouter.post('/signUp', (req: typeReq, res: typeRes) => {
  const expressAdapter = new ExpressAdapter(req, res)
  new ControllerAuth(expressAdapter).signUp()
})

authRouter.get('/verifytoken', (req: typeReq, res: typeRes) => {
  const expressAdapter = new ExpressAdapter(req, res)
  new ControllerAuth(expressAdapter).verifyToken()
})

authRouter.get('/logOut', (req: typeReq, res: typeRes) => {
  const expressAdapter = new ExpressAdapter(req, res)
  new ControllerAuth(expressAdapter).logOut()
})