import { User } from '../../domain';
import { LoginUserDTO, RegisterUserDTO } from '../../presentation/dto/auth';

export interface AuthService {
  register(registerUserDTO: RegisterUserDTO): Promise<User>;
  login(loginUserDTO: LoginUserDTO): Promise<{ token: string, user: User }>;
  getUsers(): Promise<User[]>;
}