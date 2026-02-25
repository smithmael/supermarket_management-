import { CategoryRepository } from '../repositories/CategoryRepository.js';

export class CategoryService {
  static async getAllCategories() {
    return await CategoryRepository.findAll();
  }

  static async createCategory(name: string) {
    return await CategoryRepository.create(name);
  }

  static async updateCategory(id: number, name: string) {
    return await CategoryRepository.update(id, name);
  }

  static async deleteCategory(id: number) {
    return await CategoryRepository.delete(id);
  }
}
