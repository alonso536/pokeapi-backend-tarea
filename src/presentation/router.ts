import { Router } from 'express';
import { AuthRouter } from './router/auth.router';
import { PokemonRouter } from './router/pokemon.router';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    
    router.use('/auth', AuthRouter.routes);
    router.use('/pokemon', PokemonRouter.routes);

    return router;
  }
}

