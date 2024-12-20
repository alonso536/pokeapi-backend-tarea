import { User } from '../../model';
import { UserRepository } from '../interface';

export class UserRepositoryPostgres implements UserRepository {

  private static instance?: UserRepositoryPostgres;

  private constructor() {}

  static getInstance(): UserRepositoryPostgres {
    if(!this.instance) {
      this.instance = new UserRepositoryPostgres();
    }

    return this.instance;
  }

  createUser(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  getUsers(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  getUser(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
}