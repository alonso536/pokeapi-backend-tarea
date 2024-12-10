import { Request, Response } from 'express';
import { AuthService, CustomError } from '../../service';
import { LoginUserDTO, RegisterUserDTO } from '../dto';

export class AuthController {

  constructor(
    public authService: AuthService,
  ) {}

  register = (req: Request, res: Response) => {
    const [error, registerUser] = RegisterUserDTO.create(req.body);

    if(error) {
      return res.status(400).json({ error });
    }

    this.authService.register(registerUser!)
      .then((user) => res.status(201).json(user))
      .catch((error) => this.handleError(error, res));
  }

  login = (req: Request, res: Response) => {
    const [error, loginUser] = LoginUserDTO.create(req.body);

    if(error) {
      return res.status(400).json({ error });
    }

    this.authService.login(loginUser!)
      .then((user) => res.status(200).json(user))
      .catch((error) => this.handleError(error, res));
  }

  getAll = (req: Request, res: Response) => {
    this.authService.getUsers()
      .then((users) => res.json({ users }))
      .catch((error) => this.handleError(error, res));
  }

  private handleError = (error: unknown, res: Response) => {
    if(error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
  }
}