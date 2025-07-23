import mongoose from 'mongoose';

type Lending = {
  readerId:mongoose.Types.ObjectId
  bookId: mongoose.Types.ObjectId
  borrowedDate: Date
  dueDate: Date
  returnedDate?: Date
  status: 'borrowed' | 'returned' | 'overdue' | 'pending'

}

const lendingSchema = new mongoose.Schema<Lending>({
    readerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reader',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    borrowedDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    returnedDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['borrowed', 'returned', 'overdue'],
        default: 'borrowed',
        required: true
    }

})

export const LendingModel = mongoose.model('Lending', lendingSchema);