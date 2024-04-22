import { RouterAdapter } from "../express/express_adapter"
import { authRouter } from "./router_auth"
import { todoRouter } from "./router_todolist"

export const router = new RouterAdapter().init()


router.use('/auth', authRouter)
router.use('/todolist', todoRouter)