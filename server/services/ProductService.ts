import { ProductRepository } from '../repositories/ProductRepository.js';

export class ProductService {
  static async getAllProducts() {
    return await ProductRepository.findAll();
  }

  static async getProductById(id: number) {
    return await ProductRepository.findById(id);
  }

  static async createProduct(data: any) {
    return await ProductRepository.create(data);
  }

  static async updateProduct(id: number, data: any) {
    return await ProductRepository.update(id, data);
  }

  static async deleteProduct(id: number) {
    return await ProductRepository.delete(id);
  }
}
