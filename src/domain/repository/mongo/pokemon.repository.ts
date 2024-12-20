import { isValidObjectId } from 'mongoose';
import { Pokemon, PokemonModel } from '../../model';
import { PokemonRepository } from '../interface';

export class PokemonRepositoryMongo implements PokemonRepository {

  private static instance?: PokemonRepository;

  private constructor() {}

  static getInstance(): PokemonRepository {
    if(!this.instance) {
      this.instance = new PokemonRepositoryMongo();
    }

    return this.instance;
  }

  async createPokemon(pokemon: Pokemon): Promise<Pokemon> {
    const newPokemon = new PokemonModel(pokemon);
    await newPokemon.save();

    return { 
      id: newPokemon._id.toString(),
      name: newPokemon.name,
      type: newPokemon.type,
      level: newPokemon.level,
      num: newPokemon.num,
      trainerId: newPokemon.trainerId.toString(),
      createdAt: newPokemon.createdAt,
    } as Pokemon;
  }

  async getPokemons(): Promise<Pokemon[]> {
    const pokemons = await PokemonModel.find({});
    return pokemons.map((p) => ({ 
      id: p._id.toString(),
      name: p.name,
      type: p.type,
      level: p.level,
      num: p.num,
      trainerId: p.trainerId.toString(),
      createdAt: p.createdAt,
    } as Pokemon));
  }

  async getPokemonsByTrainer(trainerId: string): Promise<Pokemon[]> {
    const pokemons = await PokemonModel.find({ trainerId });
    return pokemons.map((p) => ({ 
      id: p._id.toString(),
      name: p.name,
      type: p.type,
      level: p.level,
      num: p.num,
      trainerId: p.trainerId.toString(),
      createdAt: p.createdAt,
    } as Pokemon));
  }

  async showPokemon(id: string): Promise<Pokemon | undefined> {
    if(!isValidObjectId(id)) {
      return undefined;
    }

    const pokemon = await PokemonModel.findById(id);
    if(!pokemon) {
      return undefined;
    }

    return { 
      id: pokemon._id.toString(),
      name: pokemon.name,
      type: pokemon.type,
      level: pokemon.level,
      num: pokemon.num,
      trainerId: pokemon.trainerId.toString(),
      createdAt: pokemon.createdAt,
    } as Pokemon;
  }

  async showPokemonByNumber(num: number): Promise<Pokemon | undefined> {
    if(isNaN(num)) {
      return undefined;
    }

    const pokemon = await PokemonModel.findOne({ num });
    if(!pokemon) {
      return undefined;
    }

    return { 
      id: pokemon._id.toString(),
      name: pokemon.name,
      type: pokemon.type,
      level: pokemon.level,
      num: pokemon.num,
      trainerId: pokemon.trainerId.toString(),
      createdAt: pokemon.createdAt,
    } as Pokemon;
  }

  async updatePokemon(pokemon: Pokemon, id: string): Promise<Pokemon> {
    const updatedPokemon = await PokemonModel.findByIdAndUpdate(id, pokemon, { new: true });

    return {
      id: updatedPokemon!._id.toString(),
      name: updatedPokemon!.name,
      type: updatedPokemon!.type,
      level: updatedPokemon!.level,
      num: updatedPokemon!.num,
      trainerId: updatedPokemon!.trainerId.toString(),
      createdAt: updatedPokemon!.createdAt,
    } as Pokemon;
  }

  async deletePokemon(id: string): Promise<void> {
    await PokemonModel.findByIdAndDelete(id);
  }
}