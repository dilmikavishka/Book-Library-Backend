
import { Request, Response } from 'express';
import {ReaderModel} from "../models/reader.model";

export const getAllReaders = async (req: Request, res: Response) => {
  try {
    const readers = await ReaderModel.find();
    res.status(200).json(readers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching readers', error });
  }
};

export const getReaderById = async (req: Request, res: Response) => {
  try {
    const reader = await ReaderModel.findById(req.params.id);
    if (!reader) {
      return res.status(404).json({ message: 'Reader not found' });
    }
    res.status(200).json(reader);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reader', error });
  }
};

export const createReader = async (req: Request, res: Response) => {
  try {
    const newReader = new ReaderModel(req.body);
    const savedReader = await newReader.save();
    res.status(201).json(savedReader);
  } catch (error) {
    res.status(500).json({ message: 'Error creating reader', error });
  }
};

export const updateReader = async (req: Request, res: Response) => {
  try {
    const updatedReader = await ReaderModel.findByIdAndUpdate(
      req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!updatedReader) {
      return res.status(404).json({ message: 'Reader not found' });
    }
    res.status(200).json(updatedReader);
  } catch (error) {
    res.status(500).json({ message: 'Error updating reader', error });
  } 
};

export const deleteReader = async (req: Request, res: Response) => {
  try {
    const deletedReader = await ReaderModel.findByIdAndDelete(req.params.id);
    if (!deletedReader) {
      return res.status(404).json({ message: 'Reader not found' });
    }
    res.status(200).json({ message: 'Reader deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reader', error });
  }
};