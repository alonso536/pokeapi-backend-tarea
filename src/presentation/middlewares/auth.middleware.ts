import { NextFunction, Request, Response } from 'express';
import { envs, JwtAdapter } from '../../config';
import { User, UserFactory, UserRepository } from '../../domain';

export class AuthMiddleware {
  static async validateJsonWebToken(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header('Authorization');
    if(!authorization) {
      return res.status(401).json({ error: 'No token provided' });
    }

    if(!authorization.startsWith('Bearer')) {
      return res.status(401).json({ error: 'Invalid bearer token' });
    }

    const token = authorization.split(' ').at(-1) || '';

    try {
      const repository: UserRepository = UserFactory.getUserRepository(envs.DATABASE_ENVIRONMENT);
      const payload = await JwtAdapter.validateJsonWebToken<{ id: string }>(token);

      if(!payload) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const user: User | undefined = await repository.getUser(payload.id);

      if(!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      req.body.user = { id: user!.id, username: user!.username, role: user!.role };
      
      next();
    } catch(error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}