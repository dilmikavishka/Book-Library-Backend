import {Router} from "express";
import {createReader, deleteReader, getAllReaders, getReaderById, updateReader} from "../controllers/reader.controller";
import {authMiddleware} from "../middleware/auth.middleware";


const  readerRouter = Router()

readerRouter.get("/",authMiddleware,getAllReaders)
readerRouter.post("/",authMiddleware,createReader);
readerRouter.get("/:id",authMiddleware,getReaderById)
readerRouter.put("/update/:id",authMiddleware,updateReader)
readerRouter.delete("/delete/:id",authMiddleware,deleteReader)

export default readerRouter;
