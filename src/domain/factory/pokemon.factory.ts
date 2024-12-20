import { PokemonRepository, PokemonRepositoryImpl, PokemonRepositoryMongo, PokemonRepositoryPostgres } from '../repository';

export class PokemonFactory {
  
  static getPokemonRepository(environment: string): PokemonRepository {
    switch(environment) {
      case 'mongo':
        return PokemonRepositoryMongo.getInstance();
      case 'postgres':
        return PokemonRepositoryPostgres.getInstance();
      default:
        return PokemonRepositoryImpl.getInstance();
    }
  }
}