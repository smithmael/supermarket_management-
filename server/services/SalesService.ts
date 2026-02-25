import { SalesRepository } from '../repositories/SalesRepository.js';
import { ProductRepository } from '../repositories/ProductRepository.js';
import prisma from '../config/database.js';

export class SalesService {
  static async processSale(items: any[], totalAmount: number, userId: number) {
    return await prisma.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          totalAmount,
          userId
        }
      });

      for (const item of items) {
        await tx.saleItem.create({
          data: {
            saleId: sale.id,
            productId: item.id,
            quantity: item.quantity,
            priceAtSale: item.price
          }
        });

        await tx.product.update({
          where: { id: item.id },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }
      return sale.id;
    });
  }

  static async getSalesStats() {
    return await SalesRepository.getStats();
  }

  static async getAllSales() {
    return await SalesRepository.findAllDetailed();
  }

  static async getSaleItems(saleId: number) {
    return await SalesRepository.findItemsBySaleId(saleId);
  }
}
