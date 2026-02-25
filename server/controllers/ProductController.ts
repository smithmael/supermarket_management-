import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/ProductService.js';

export class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json({ id: product.id });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await ProductService.updateProduct(parseInt(id), req.body);
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await ProductService.deleteProduct(parseInt(id));
      res.json({ success: true });
    } catch (err) {
      next(err);
    }
  }
}
