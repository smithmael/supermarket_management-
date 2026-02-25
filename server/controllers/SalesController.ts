import { Request, Response, NextFunction } from 'express';
import { SalesService } from '../services/SalesService.js';

export class SalesController {
  static async create(req: Request, res: Response, next: NextFunction) {
    const { items, total_amount } = req.body;
    const user = (req as any).user;
    
    try {
      const saleId = await SalesService.processSale(items, total_amount, user.id);
      res.status(201).json({ id: saleId });
    } catch (err) {
      next(err);
    }
  }

  static async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await SalesService.getSalesStats();
      res.json(stats);
    } catch (err) {
      next(err);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const sales = await SalesService.getAllSales();
      res.json(sales);
    } catch (err) {
      next(err);
    }
  }

  static async getItems(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const items = await SalesService.getSaleItems(parseInt(id));
      res.json(items);
    } catch (err) {
      next(err);
    }
  }
}
