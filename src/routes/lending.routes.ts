import {Router} from "express";
import {
    createLending,
    deleteLending,
    getLendingById,
    getLendings,
    getLendingsWithNames,
    updateLending,
    notifyOverdueReaders,
    notifyOverdueReaderById
} from "../controllers/lending.controller";
import {authMiddleware} from "../middleware/auth.middleware";


const lendingRouter = Router();
lendingRouter.get("/with-names", authMiddleware, getLendingsWithNames);
lendingRouter.post("/notify-overdue", authMiddleware, notifyOverdueReaders);
lendingRouter.post("/notify-overdue-with-user/:readerId", authMiddleware, notifyOverdueReaderById);
lendingRouter.get("/",authMiddleware,getLendings)
lendingRouter.get("/:id",authMiddleware,getLendingById)
lendingRouter.post("/",authMiddleware,createLending);
lendingRouter.put("/update/:id",authMiddleware,updateLending);
lendingRouter.delete("/delete/:id",authMiddleware,deleteLending);





export default lendingRouter;
