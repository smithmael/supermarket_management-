import prisma from '../config/database.js';

export class ProductRepository {
  static async findAll() {
    const products = await prisma.product.findMany({
      include: {
        category: true
      }
    });
    return products.map(p => ({
      ...p,
      category_name: p.category?.name
    }));
  }

  static findById(id: number) {
    return prisma.product.findUnique({
      where: { id }
    });
  }

  static create(data: any) {
    const { name, category_id, price, stock, sku } = data;
    return prisma.product.create({
      data: {
        name,
        categoryId: category_id,
        price,
        stock,
        sku
      }
    });
  }

  static update(id: number, data: any) {
    const { name, category_id, price, stock, sku } = data;
    return prisma.product.update({
      where: { id },
      data: {
        name,
        categoryId: category_id,
        price,
        stock,
        sku
      }
    });
  }

  static delete(id: number) {
    return prisma.product.delete({
      where: { id }
    });
  }

  static updateStock(id: number, quantity: number) {
    return prisma.product.update({
      where: { id },
      data: {
        stock: {
          decrement: quantity
        }
      }
    });
  }
}
