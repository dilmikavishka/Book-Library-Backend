import { Router } from "express";
import bookRouter from "./book.routes";
import lendingRouter from "./lending.routes";
import readerRouter from "./reader.routes";
import userRouter from "./user.routes";
import imagekitRouter from "./imagekit.route";
import dashboardRouter from "./dashboard.routes";


const rootRouter = Router();

rootRouter.use("/books",bookRouter)
rootRouter.use("/readers",readerRouter)
rootRouter.use("/lendings",lendingRouter)
rootRouter.use("/users",userRouter)
rootRouter.use("/imagekit",imagekitRouter)
rootRouter.use("/dashboard",dashboardRouter)    

export default rootRouter;