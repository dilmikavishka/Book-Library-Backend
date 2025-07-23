import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'd95e35f918cbadcfe6f1ef01f5ffb2448df6c2ef885b51fc8dad18311d671371');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token', error });
  }
};
