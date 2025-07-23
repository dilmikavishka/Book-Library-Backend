import { Router } from "express";
import bookRouter from "./book.routes";
import lendingRouter from "./lending.routes";
import readerRouter from "./reader.routes";
import userRouter from "./user.routes";


const rootRouter = Router();

rootRouter.use("/books",bookRouter)
rootRouter.use("/readers",readerRouter)
rootRouter.use("/lendings",lendingRouter)
rootRouter.use("/users",userRouter)

export default rootRouter;