import { Router } from 'express';
import { AuthService, AuthServiceImpl } from '../../service';
import { UserRepository, UserRepositoryImpl } from '../../domain';
import { AuthController } from '../controller/auth.controller';

export class AuthRouter {
  static get routes(): Router {
    const router = Router();

    const repository: UserRepository = UserRepositoryImpl.getInstance();
    const service: AuthService = new AuthServiceImpl(repository);
    const controller = new AuthController(service);

    router.post('/login', controller.login);
    router.post('/register', controller.register);
    router.get('/', controller.getAll);

    return router;
  }
}