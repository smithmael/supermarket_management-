import db from '../config/database.js';

export class CategoryRepository {
  static findAll() {
    return db.prepare("SELECT * FROM categories").all();
  }

  static create(name: string) {
    return db.prepare("INSERT INTO categories (name) VALUES (?)").run(name);
  }

  static update(id: number, name: string) {
    return db.prepare("UPDATE categories SET name = ? WHERE id = ?").run(name, id);
  }

  static delete(id: number) {
    return db.prepare("DELETE FROM categories WHERE id = ?").run(id);
  }
}
