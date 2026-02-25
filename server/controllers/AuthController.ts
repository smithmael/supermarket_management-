import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService.js';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const { username, password, role } = req.body;
    try {
      await AuthService.register(username, password, role);
      res.status(201).json({ message: 'User created' });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    try {
      const result = await AuthService.login(username, password);
      if (!result) return res.status(401).json({ error: 'Invalid credentials' });

      res.cookie('token', result.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
      });

      res.json(result.user);
    } catch (err) {
      next(err);
    }
  }

  static logout(req: Request, res: Response) {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
  }

  static me(req: Request, res: Response) {
    res.json((req as any).user);
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await AuthService.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await AuthService.deleteUser(parseInt(id));
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }
}
