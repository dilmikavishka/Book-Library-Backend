import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';

dotenv.config();


export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      role,
      passwordHash: hashedPassword,
    });

    const savedUser = await newUser.save();
    return res.status(201).json({
      message: 'User registered successfully',
      user: savedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error registering user',
      error,
    });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: '2h' }
    );

    const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN as string,
        { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error logging in',
      error,
    });
  }
};
