import { Request, Response } from 'express';
import User from '../models/userModel';

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

  static async createUser(req: Request, res: Response) {
    const userData = req.body;
    try {
      const newUser = await User.create(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: 'Bad Request' });
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