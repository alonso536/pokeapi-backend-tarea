import { PrismaClient } from '@prisma/client';
import { Pokemon } from '../../model';
import { PokemonRepository } from '../interface';
import { UUID } from '../../../config';

export class PokemonRepositoryPostgres implements PokemonRepository {

  private static instance?: PokemonRepositoryPostgres;
  private prisma: PrismaClient;
  
  private constructor() {
    this.prisma = new PrismaClient();
  }

  static getInstance(): PokemonRepositoryPostgres {
    if(!this.instance) {
      this.instance = new PokemonRepositoryPostgres();
    }

    return this.instance;
  }

  async createPokemon(pokemon: Pokemon): Promise<Pokemon> {
    const { trainerId, createdAt, ...p } = pokemon;
    const { trainer_id, created_at, ...rest } = await this.prisma.pokemons.create({ 
      data: { ...p, trainer_id: trainerId, created_at: new Date() }
    });
    return { trainerId: trainer_id, createdAt: created_at, ...rest };
  }

  async getPokemons(): Promise<Pokemon[]> {
    const pokemons = await this.prisma.pokemons.findMany({});
    return pokemons.map((p) => {
      const { trainer_id, created_at, ...rest } = p;
      return { ...rest, trainerId: trainer_id, createdAt: created_at } as Pokemon;
    });
  }

  async getPokemonsByTrainer(trainerId: string): Promise<Pokemon[]> {
    const pokemons = await this.prisma.pokemons.findMany({ where: { trainer_id: trainerId } });
    return pokemons.map((p) => {
      const { trainer_id, created_at, ...rest } = p;
      return { ...rest, trainerId: trainer_id, createdAt: created_at } as Pokemon;
    });
  }

  async showPokemon(id: string): Promise<Pokemon | undefined> {
    if(!UUID.isValidUUID(id)) {
      return undefined;
    }

    const pokemon = await this.prisma.pokemons.findFirst({ where: { id } });
    if(!pokemon) {
      return undefined;
    }

    const { trainer_id, created_at, ...rest } = pokemon;
    return { trainerId: trainer_id, createdAt: created_at, ...rest };
  }

  async showPokemonByNumber(num: number): Promise<Pokemon | undefined> {
    if(isNaN(num)) {
      return undefined;
    }

    const pokemon = await this.prisma.pokemons.findFirst({ where: { num } });
    if(!pokemon) {
      return undefined;
    }

    const { trainer_id, created_at, ...rest } = pokemon;
    return { trainerId: trainer_id, createdAt: created_at, ...rest };
  }

  async updatePokemon(pokemon: Pokemon, id: string): Promise<Pokemon> {
    const { trainerId, createdAt, ...p } = pokemon;
    const { trainer_id, created_at, ...rest } = await this.prisma.pokemons.update({ 
      data: { ...p },
      where: { id },
    });
    return { trainerId: trainer_id, createdAt: created_at, ...rest };
  }

  async deletePokemon(id: string): Promise<void> {
    this.prisma.pokemons.delete({ where: { id } });
  }
}