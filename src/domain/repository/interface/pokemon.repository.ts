import { Pokemon } from '../../model';

export interface PokemonRepository {
  createPokemon(pokemon: Pokemon): Promise<Pokemon>;
  getPokemons(): Promise<Pokemon[]>;
  getPokemonsByTrainer(trainerId: string): Promise<Pokemon[]>;
  showPokemon(id: string): Promise<Pokemon | undefined>;
  showPokemonByNumber(num: number): Promise<Pokemon | undefined>;
  updatePokemon(pokemon: Pokemon, id: string): Promise<Pokemon>;
  deletePokemon(id: string): Promise<void>;
}