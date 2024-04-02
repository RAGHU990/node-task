import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import dotenv from 'dotenv';
dotenv.config();



export default class UserController {

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async getUserById(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;     
       const newUser = await User.create(userData);
      
      // Generate JWT token with user data and set expiration to 30 days
      const token = jwt.sign({ email: userData.email, phone: userData.phone }, 'process.env.JWT_SECRET', { expiresIn: '30d' });
  
      res.status(201).json({ user: newUser, token });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json({ message: error || 'Bad Request' });
    }
  }

  static async updateUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const userData = req.body;
    try {
      let user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user = await user.update(userData);
      res.json({
        userData: user,
        message: 'user updated successfully',
      });
    } catch (error) {
      res.status(400).json({ message: 'Bad Request' });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}