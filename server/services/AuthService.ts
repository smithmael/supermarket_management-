import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/UserRepository.js';
import { generateToken } from '../utils/auth.js';

export class AuthService {
  static async register(username: string, password: string, role: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await UserRepository.create(username, hashedPassword, role);
    return userId;
  }

  static async login(username: string, password: string) {
    const user = await UserRepository.findByUsername(username);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    const token = generateToken({ id: user.id, username: user.username, role: user.role });
    return { token, user: { id: user.id, username: user.username, role: user.role } };
  }

  static async getAllUsers() {
    return await UserRepository.findAll();
  }

  static async deleteUser(id: number) {
    return await UserRepository.delete(id);
  }
}
