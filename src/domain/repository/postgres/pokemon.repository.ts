import { Pokemon } from '../../model';
import { PokemonRepository } from '../interface';

export class PokemonRepositoryPostgres implements PokemonRepository {

  private static instance?: PokemonRepositoryPostgres;
  
  private constructor() {}

  static getInstance(): PokemonRepositoryPostgres {
    if(!this.instance) {
      this.instance = new PokemonRepositoryPostgres();
    }

    return this.instance;
  }

  createPokemon(pokemon: Pokemon): Promise<Pokemon> {
    throw new Error('Method not implemented.');
  }
  getPokemons(): Promise<Pokemon[]> {
    throw new Error('Method not implemented.');
  }
  getPokemonsByTrainer(trainerId: string): Promise<Pokemon[]> {
    throw new Error('Method not implemented.');
  }
  showPokemon(id: string): Promise<Pokemon | undefined> {
    throw new Error('Method not implemented.');
  }
  showPokemonByNumber(num: number): Promise<Pokemon | undefined> {
    throw new Error('Method not implemented.');
  }
  updatePokemon(pokemon: Pokemon, id: string): Promise<Pokemon> {
    throw new Error('Method not implemented.');
  }
  deletePokemon(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}