import { BookModel } from "../models/book.model.js";
import { LendingModel } from "../models/lending.model.js";
import { ReaderModel } from "../models/reader.model.js";
import { Request, Response } from "express";
/**
 * Controller to handle dashboard statistics
 * @param req - Express request object
 * @param res - Express response object
 */


export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalBooks = await BookModel.countDocuments();
    const totalReaders = await ReaderModel.countDocuments();
    const booksLentOut = await LendingModel.countDocuments();
    const overdueBooks = await LendingModel.countDocuments({
      status:"overdue",

      dueDate: { $lt: new Date() },
    });

  const recentLendings = await LendingModel.find()
  .sort({ borrowedDate: -1 })  
  .limit(5)
  .populate("bookId", "title author")   
  .populate("readerId", "name email")    
  .lean();

    res.json({
      totalBooks,
      totalReaders,
      totalLendings: booksLentOut,
      overdueLendings: overdueBooks,
      recentLendings,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ error: "Failed to fetch dashboard statistics" });
  }
};

