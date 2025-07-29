import mongoose from 'mongoose';


type Book = {
    title: string;
    author?: string;
    isbn?: string;
    category?: string;
    copiesAvailable?: number;
    coverColor?: string;
    coverImage?: string; 
}
const bookSchema = new mongoose.Schema<Book>({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: [2, "Title must be at least 2 characters long"]
    },
  author: {
    type: String,
    required: [true, "Author is required"],
    trim: true,
    minlength: [2, "Author name must be at least 2 characters long"]
  },
    isbn: {
        type: String,
        unique: true,
        required: [true, "ISBN is required"],
        match: [/^\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}$/, "Please enter a valid ISBN format"]
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
        minlength: [2, "Category must be at least 2 characters long"]
    },
    copiesAvailable: {
        type: Number,
        default: 0,
        min: [0, "Copies available cannot be negative"]
    },
    coverColor: {
        type: String,
        default: "white",
        trim: true
    },
    coverImage: {
        type: String,
        default: "",
        trim: true
    }
});
export const BookModel = mongoose.model("Book", bookSchema);