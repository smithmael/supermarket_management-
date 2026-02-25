import prisma from '../config/database.js';

export class SalesRepository {
  static create(totalAmount: number, userId: number) {
    return prisma.sale.create({
      data: {
        totalAmount,
        userId
      }
    });
  }

  static createItem(saleId: number, productId: number, quantity: number, priceAtSale: number) {
    return prisma.saleItem.create({
      data: {
        saleId,
        productId,
        quantity,
        priceAtSale
      }
    });
  }

  static async getStats() {
    // SQLite specific grouping by date
    const stats = await prisma.$queryRaw`
      SELECT date(timestamp) as date, SUM(totalAmount) as total 
      FROM Sale 
      GROUP BY date(timestamp) 
      ORDER BY date DESC 
      LIMIT 7
    ` as any[];
    return stats;
  }

  static async findAllDetailed() {
    const sales = await prisma.sale.findMany({
      include: {
        user: {
          select: { username: true }
        }
      },
      orderBy: {
        timestamp: 'desc'
      }
    });
    return sales.map(s => ({
      ...s,
      cashier_name: s.user?.username
    }));
  }

  static async findItemsBySaleId(saleId: number) {
    const items = await prisma.saleItem.findMany({
      where: { saleId },
      include: {
        product: {
          select: { name: true }
        }
      }
    });
    return items.map(i => ({
      ...i,
      product_name: i.product?.name
    }));
  }
}
