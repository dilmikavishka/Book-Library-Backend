import mongoose from 'mongoose';

type Reader = {
    name: string;
    email: string;
    phone?: string;
    membershipDate?: string;
}

const readerSchema = new mongoose.Schema<Reader>({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters long"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        trim: true,
        index: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true,
        minlength: [10, "Phone number must be at least 10 characters long"]
    },
    membershipDate: {
        type: String,
        default: new Date().toISOString().split('T')[0],
        validate: {
            validator: function(v: string) {
                return /^\d{4}-\d{2}-\d{2}$/.test(v);
            },
            message: props => `${props.value} is not a valid date!`
        }
    }
})

export const ReaderModel = mongoose.model("Reader", readerSchema);