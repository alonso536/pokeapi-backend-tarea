import { UUID } from '../../config';
import { Pokemon, PokemonRepository } from '../../domain';
import { CreatePokemonDTO, UpdatePokemonDTO } from '../../presentation/dto';
import { CustomError } from '../error';
import { PokemonService } from '../interface';

export class PokemonServiceImpl implements PokemonService {

  constructor(
    private pokemonRepository: PokemonRepository,
  ) {}

  async createPokemon(createPokemonDTO: CreatePokemonDTO): Promise<Pokemon> {
    try {
      const pokemon: Pokemon = {
        ...createPokemonDTO,
        id: UUID.getDefaultUUID(),
        createdAt: new Date(),
      };

      return await this.pokemonRepository.createPokemon(pokemon);
    } catch(error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async getPokemons(): Promise<Pokemon[]> {
    try {
      return await this.pokemonRepository.getPokemons();
    } catch(error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async getPokemonsByTrainer(trainerId: string): Promise<Pokemon[]> {
    try {
      return await this.pokemonRepository.getPokemonsByTrainer(trainerId);
    } catch(error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async showPokemon(id: string): Promise<Pokemon> {
    let pokemon = await this.pokemonRepository.showPokemon(id);

    if(!pokemon) {
      pokemon = await this.pokemonRepository.showPokemonByNumber(+id);
    }

    if(!pokemon) {
      throw CustomError.notFound(`Pokemon with id ${id} not found`);
    }

    try {
      return pokemon as Pokemon;
    } catch(error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async updatePokemon(updatePokemonDTO: UpdatePokemonDTO, id: string, trainerId: string): Promise<Pokemon> {
    const pokemon = await this.showPokemon(id);
    const { name, type, level, ...rest } = pokemon;

    if(trainerId !== pokemon.trainerId) {
      throw CustomError.forbidden('You are not the pokemon owner');
    }

    try {
      return this.pokemonRepository.updatePokemon({ ...updatePokemonDTO, ...rest }, id);
    } catch(error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async deletePokemon(id: string, trainerId: string): Promise<void> {
    const pokemon = await this.showPokemon(id);

    if(trainerId !== pokemon.trainerId) {
      throw CustomError.forbidden('You are not the pokemon owner');
    }

    try {
      return this.pokemonRepository.deletePokemon(id);
    } catch(error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }
}