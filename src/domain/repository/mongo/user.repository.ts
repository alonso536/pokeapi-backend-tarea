import { userInfo } from 'os';
import { User, UserModel } from '../../model';
import { UserRepository } from '../interface';

export class UserRepositoryMongo implements UserRepository {

  private static instance?: UserRepository;

  private constructor() {}

  static getInstance(): UserRepository {
    if(!this.instance) {
      this.instance = new UserRepositoryMongo();
    }

    return this.instance;
  }
  
  async createUser(user: User): Promise<User> {
    const newUser = new UserModel(user);
    await newUser.save();

    return { 
      id: newUser._id.toString(),
      username: newUser.username,
      role: newUser.role,
    } as User;
  }

  async getUsers(): Promise<User[]> {
    const users = await UserModel.find({});
    return users.map((u) => ({ 
      id: u._id.toString(),
      username: u.username,
      password: u.password,
      role: u.role,
    } as User));
  }

  async getUser(id: string): Promise<User | undefined> {
    const user = await UserModel.findById(id);
    if(!user) {
      return undefined;
    }

    return { 
      id: user._id.toString(),
      username: user.username,
      password: user.password,
      role: user.role,
    } as User;
  }
}