import { User } from '../../model';

export interface UserRepository {
  createUser(user: User): Promise<User>;
  getUsers(): Promise<User[]>;
  getUser(id: string): Promise<User | undefined>;
}