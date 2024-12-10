export class LoginUserDTO {

  constructor(
    public username: string,
    public password: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDTO?] {
    const { username, password } = object;
    return [undefined, new LoginUserDTO(username, password)];
  }
}