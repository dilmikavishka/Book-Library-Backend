import mongoose from 'mongoose';

type User ={
  name: string,
  email: string,
  passwordHash:string,
  role:string

}
const userSchema = new mongoose.Schema<User>({
  name:{
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"]
  },
  email:{
    type: String,
    required: [true, "Email is required"],
    trim: true,
    minlength: [2, "Email must be at least 2 characters long"],
    match:[/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
  },
  passwordHash:{
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: [2, "Password must be at least 2 characters long"]
  },
  role:{
    type: String,
    required: [true, "Role is required"],
    trim: true,
    minlength: [2, "Role must be at least 2 characters long"]
  }

});

export const UserModel = mongoose.model('User', userSchema);