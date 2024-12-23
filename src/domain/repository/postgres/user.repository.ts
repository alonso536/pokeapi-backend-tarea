import { PrismaClient } from '@prisma/client';
import { User } from '../../model';
import { UserRepository } from '../interface';

export class UserRepositoryPostgres implements UserRepository {

  private static instance?: UserRepositoryPostgres;
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
  }

  static getInstance(): UserRepositoryPostgres {
    if(!this.instance) {
      this.instance = new UserRepositoryPostgres();
    }

    return this.instance;
  }

  async createUser(user: User): Promise<User> {
    return await this.prisma.users.create({ data: { ...user, role: 'ROLE_USER' } });
  }

  async getUsers(): Promise<User[]> {
    return await this.prisma.users.findMany({});
  }

  async getUser(id: string): Promise<User | undefined> {
    const user = await this.prisma.users.findFirst({ where: { id } });
    if(!user) {
      return undefined;
    }

    return user;
  }
}