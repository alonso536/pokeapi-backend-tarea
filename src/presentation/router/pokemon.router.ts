import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { PokemonFactory, PokemonRepository } from '../../domain';
import { PokemonService, PokemonServiceImpl } from '../../service';
import { PokemonController } from '../controller/pokemon.controller';
import { envs } from '../../config';

export class PokemonRouter {
  static get routes(): Router {
    const router = Router();
  
    const repository: PokemonRepository = PokemonFactory.getPokemonRepository(envs.DATABASE_ENVIRONMENT);
    const service: PokemonService = new PokemonServiceImpl(repository);
    const controller: PokemonController = new PokemonController(service);
  
    router.post('/', [AuthMiddleware.validateJsonWebToken], controller.add);
    router.get('/', controller.getAll);
    router.get('/:id', controller.show);
    router.get('/trainer/mypokemons', [AuthMiddleware.validateJsonWebToken], controller.getAllByTrainer);
    router.put('/:id', [AuthMiddleware.validateJsonWebToken], controller.update);
    router.delete('/:id', [AuthMiddleware.validateJsonWebToken], controller.delete);
  
    return router;
  }
}