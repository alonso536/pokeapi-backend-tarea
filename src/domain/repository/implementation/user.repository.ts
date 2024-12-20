import { UUID } from '../../../config';
import { User } from '../../model';
import { UserRepository } from '../interface/user.repository';

export class UserRepositoryImpl implements UserRepository {

  private users: User[];
  private static instance?: UserRepository;

  private constructor() {
    this.users = [];
  }

  static getInstance(): UserRepository {
    if(!this.instance) {
      this.instance = new UserRepositoryImpl();
    }

    return this.instance;
  }

  async createUser(user: User): Promise<User> {
    const newUser: User = { 
      ...user,
      id: UUID.getDefaultUUID(),
      role: 'ROLE_USER',
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUsers(): Promise<User[]> {
    return this.users;
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }
}