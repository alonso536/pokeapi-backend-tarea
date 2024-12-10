import { Pokemon } from '../../model';
import { PokemonRepository } from '../interface/pokemon.repository';

export class PokemonRepositoryImpl implements PokemonRepository {

  private pokemons: Pokemon[];
  static instance?: PokemonRepository;

  private constructor() {
    this.pokemons = [];
  }

  static getInstance(): PokemonRepository {
    if(!this.instance) {
      this.instance = new PokemonRepositoryImpl();
    }

    return this.instance;
  }

  async createPokemon(pokemon: Pokemon): Promise<Pokemon> {
    this.pokemons.push(pokemon);
    return pokemon;
  }

  async getPokemons(): Promise<Pokemon[]> {
    return this.pokemons;
  }

  async getPokemonsByTrainer(trainerId: string): Promise<Pokemon[]> {
    return this.pokemons.filter((p) => p.trainerId === trainerId);
  }

  async showPokemon(id: string): Promise<Pokemon | undefined> {
    return this.pokemons.find((p) => p.id === id);
  }

  async showPokemonByNumber(num: number): Promise<Pokemon | undefined> {
    return this.pokemons.find((p) => p.num === num);
  }

  async updatePokemon(pokemon: Pokemon, id: string): Promise<Pokemon> {
    this.pokemons = this.pokemons.map((p) => {
      if(p.id === id) {
        return { ...pokemon } as Pokemon;
      }

      return { ...p };
    });

    return pokemon;
  }

  async deletePokemon(id: string): Promise<void> {
    const index = this.pokemons.findIndex((p) => p.id === id);
    this.pokemons.splice(index, 1);
  }
}