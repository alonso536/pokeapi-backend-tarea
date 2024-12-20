import { Router } from 'express';
import { AuthService, AuthServiceImpl } from '../../service';
import { UserFactory, UserRepository } from '../../domain';
import { AuthController } from '../controller/auth.controller';
import { envs } from '../../config';

export class AuthRouter {
  static get routes(): Router {
    const router = Router();

    const repository: UserRepository = UserFactory.getUserRepository(envs.DATABASE_ENVIRONMENT);
    const service: AuthService = new AuthServiceImpl(repository);
    const controller = new AuthController(service);

    router.post('/login', controller.login);
    router.post('/register', controller.register);
    router.get('/', controller.getAll);

    return router;
  }
}