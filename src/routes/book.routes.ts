import { Router } from "express";
import {createBook, updateBook, getAllBooks, getBookById, deleteBook} from '../controllers/book.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const bookRouter = Router();


bookRouter.post('/',authMiddleware,createBook);
bookRouter.put('/update/:id',authMiddleware,updateBook);
bookRouter.get('/',authMiddleware,getAllBooks);
bookRouter.get('/:id',authMiddleware,getBookById);
bookRouter.delete('/delete/:id',authMiddleware,deleteBook);

export default bookRouter;
