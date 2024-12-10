import { Pokemon } from '../../domain';
import { CreatePokemonDTO, UpdatePokemonDTO } from '../../presentation/dto';

export interface PokemonService {
  createPokemon(createPokemonDTO: CreatePokemonDTO): Promise<Pokemon>;
  getPokemons(): Promise<Pokemon[]>;
  getPokemonsByTrainer(trainerId: string): Promise<Pokemon[]>;
  showPokemon(id: string): Promise<Pokemon>;
  updatePokemon(updatePokemonDTO: UpdatePokemonDTO, id: string, trainerId: string): Promise<Pokemon>;
  deletePokemon(id: string, trainerId: string): Promise<void>;
}