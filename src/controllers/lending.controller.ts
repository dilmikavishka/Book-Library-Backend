import { Request, Response} from "express";
import {LendingModel} from "../models/lending.model";
import { BookModel } from "../models/book.model";
import { sendEmail } from "../utils/email";


export const getLendings = async (req: Request, res: Response): Promise<Response> => {
  try {
    const lendings = await LendingModel.find();
    return res.status(200).json(lendings);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving lendings', error });
  }
};

export const getLendingsWithNames = async (req: Request, res: Response): Promise<Response> => {
  try {
    const lendings = await LendingModel.find()
        .populate("bookId", "title")
        .populate("readerId", "name email")

    return res.status(200).json(lendings)
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving lendings', error })
  }
}

export const createLending = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { bookId } = req.body;
    const book = await BookModel.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (typeof book.copiesAvailable !== "number" || book.copiesAvailable < 1) {
      return res.status(400).json({ message: "No copies available for this book" });
    }

    book.copiesAvailable -= 1;
    await book.save();

    const newLending = new LendingModel(req.body);
    const savedLending = await newLending.save();
    return res.status(201).json(savedLending);

  } catch (error) {
    return res.status(500).json({ message: "Error creating lending", error });
  }
};

export const updateLending = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const existingLending = await LendingModel.findById(id);
    if (!existingLending) {
      return res.status(404).json({ message: "Lending not found" });
    }

    if (status === "returned" && existingLending.status !== "returned") {
      const book = await BookModel.findById(existingLending.bookId);
      if (book) {
        if (typeof book.copiesAvailable !== "number") {
          book.copiesAvailable = 1;
        } else {
          book.copiesAvailable += 1;
        }
        await book.save();
      }
    }
    const updatedLending = await LendingModel.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updatedLending);

  } catch (error) {
    return res.status(500).json({ message: 'Error updating lending', error });
  }
};

export const deleteLending = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const deletedLending = await LendingModel.findByIdAndDelete(id);
    if (!deletedLending) {
      return res.status(404).json({ message: 'Lending not found' });
    }
    return res.status(200).json({ message: 'Lending deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting lending', error });
  }
};

export const getLendingById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const lending = await LendingModel.findById(id);
    if (!lending) {
      return res.status(404).json({ message: 'Lending not found' });
    }
    return res.status(200).json(lending);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching lending', error });
  }
};

export const notifyOverdueReaders = async (req: Request, res: Response): Promise<Response> => {
  try {
    const overdueLendings = await LendingModel.find({ status: "overdue" })
        .populate<{ readerId: { name: string; email?: string } }>("readerId", "name email");

    for (const lending of overdueLendings) {
      const reader = lending.readerId;
      if (!reader || !reader.email) continue;

      const subject = "Library Reminder: Overdue Book";
      const message = `Dear ${reader.name},\n\nOur records show that you have an overdue book. Please return it as soon as possible.\n\nThank you.`;

      await sendEmail(reader.email, subject, message);
    }

    return res.status(200).json({ message: "Emails sent to overdue readers" });
  } catch (error) {
    console.error("Error sending overdue notifications:", error);
    return res.status(500).json({ message: "Error sending overdue notifications", error });
  }
};

export const notifyOverdueReaderById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { readerId } = req.params;
    console.log(readerId)
    const overdueLendings = await LendingModel.find({ readerId })
        .populate<{ readerId: { name: string; email?: string } }>("readerId", "name email");

    if (overdueLendings.length === 0 || !overdueLendings[0].readerId) {
      return res.status(400).json({ message: "No overdue lending found or reader missing" });
    }

    const reader = overdueLendings[0].readerId;
    if (!reader || !reader.email) {
      return res.status(400).json({ message: "Reader email not found" });
    }

    const subject = "Library Reminder: Overdue Book";
    const message = `Dear ${reader.name},\n\nOur records show that you have overdue book(s). Please return them as soon as possible.\n\nThank you.`;

    await sendEmail(reader.email, subject, message);

    return res.status(200).json({ message: `Email sent to ${reader.email}` });
  } catch (error) {
    console.error("Notify Error:", error);
    return res.status(500).json({
      message: "Error sending overdue notification",
      error: error instanceof Error ? error.message : error,
    });
  }
};