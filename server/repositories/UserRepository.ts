import prisma from '../config/database.js';

export class UserRepository {
  static findByUsername(username: string) {
    return prisma.user.findUnique({
      where: { username }
    });
  }

  static async create(username: string, passwordHash: string, role: string) {
    const user = await prisma.user.create({
      data: { username, password: passwordHash, role }
    });
    return user.id;
  }

  static count() {
    return prisma.user.count();
  }

  static findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true
      }
    });
  }

  static delete(id: number) {
    return prisma.user.delete({
      where: { id }
    });
  }
}
