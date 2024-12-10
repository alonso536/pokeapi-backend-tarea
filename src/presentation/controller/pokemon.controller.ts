import { Request, Response } from 'express';
import { CustomError, PokemonService } from '../../service';
import { CreatePokemonDTO, UpdatePokemonDTO } from '../dto';

export class PokemonController {
  
  constructor(
    private readonly pokemonService: PokemonService,
  ) {}

  getAll = (req: Request, res: Response) => {
    this.pokemonService.getPokemons()
      .then((pokemons) => res.json({ pokemons }))
      .catch((error) => this.handleError(error, res));
  }

  add = (req: Request, res: Response) => {
    const [error, createPokemonDTO] = CreatePokemonDTO.create({ ...req.body, trainerId: req.body.user.id });

    if(error) {
      return res.status(400).json({ error });
    }

    this.pokemonService.createPokemon(createPokemonDTO!)
      .then((pokemon) => res.status(201).json({ pokemon }))
      .catch((error) => this.handleError(error, res));
  }

  show = (req: Request, res: Response) => {
    const { id } = req.params;

    if(!id) {
      return res.status(400).json({ error: 'Missing id' });
    }

    this.pokemonService.showPokemon(id)
      .then((pokemon) => res.status(200).json({ pokemon }))
      .catch((error) => this.handleError(error, res));
  }

  getAllByTrainer = (req: Request, res: Response) => {
    const trainerId = req.body.user.id;

    if(!trainerId) {
      return res.status(400).json({ error: 'Missing trainer id' });
    }

    this.pokemonService.getPokemonsByTrainer(trainerId)
      .then((pokemon) => res.status(200).json({ pokemon }))
      .catch((error) => this.handleError(error, res));
  }

  update = (req: Request, res: Response) => {
    const { id } = req.params;
    const trainerId = req.body.user.id;
    const [error, updatePokemonDTO] = UpdatePokemonDTO.create({ ...req.body });

    if(!id) {
      return res.status(400).json({ error: 'Missing id' });
    }

    if(!trainerId) {
      return res.status(400).json({ error: 'Missing trainer id' });
    }

    if(error) {
      return res.status(400).json({ error });
    }

    this.pokemonService.updatePokemon(updatePokemonDTO!, id, trainerId)
      .then((pokemon) => res.status(200).json({ pokemon }))
      .catch((error) => this.handleError(error, res));
  }

  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    const trainerId = req.body.user.id;

    if(!id) {
      return res.status(400).json({ error: 'Missing id' });
    }

    if(!trainerId) {
      return res.status(400).json({ error: 'Missing trainer id' });
    }

    this.pokemonService.deletePokemon(id, trainerId)
      .then(() => res.status(200).json({ message: 'Pokemon deleted!' }))
      .catch((error) => this.handleError(error, res));
  }

  private handleError(error: unknown, res: Response) {
    if(error instanceof CustomError) { 
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
} 