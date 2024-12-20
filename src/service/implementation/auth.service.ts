import { bcryptAdapter, JwtAdapter, UUID } from '../../config';
import { User, UserRepository } from '../../domain';
import { LoginUserDTO, RegisterUserDTO } from '../../presentation/dto';
import { CustomError } from '../error';
import { AuthService } from '../interface';

export class AuthServiceImpl implements AuthService {

  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async register(registerUserDTO: RegisterUserDTO): Promise<User> {
    const users = await this.userRepository.getUsers();
    const existsUser = users.some((u) => u.username === registerUserDTO.username);

    if(existsUser) {
      throw CustomError.badRequest('Username is already in use');
    }

    try {
      const user = {
        username: registerUserDTO.username,
        password: bcryptAdapter.hash(registerUserDTO.password),
      } as User;

      return await this.userRepository.createUser(user);
    } catch(error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async login(loginUserDTO: LoginUserDTO): Promise<{ token: string, user: User }> {
    const users = await this.userRepository.getUsers();
    const user = users.find((u) => u.username === loginUserDTO.username);

    if (!user) {
      throw CustomError.unauthorized('Invalid credentials');
    }

    if(!bcryptAdapter.compare(loginUserDTO.password, user.password)) {
      throw CustomError.unauthorized('Invalid credentials');
    }

    try {
      const token = await JwtAdapter.generateJsonWebToken({ id: user.id }, '2h') as string;

      return {
        token,
        user,
      };
    } catch(error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      return await this.userRepository.getUsers();
    } catch(error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }
}