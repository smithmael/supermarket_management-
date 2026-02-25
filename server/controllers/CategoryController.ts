import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/CategoryService.js';

export class CategoryController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.createCategory(req.body.name);
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await CategoryService.updateCategory(parseInt(id), req.body.name);
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await CategoryService.deleteCategory(parseInt(id));
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }
}
