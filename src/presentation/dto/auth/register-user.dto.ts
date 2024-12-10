export class RegisterUserDTO {

  constructor(
    public username: string,
    public password: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDTO?] {
    const { username, password } = object;
    
    if(!username) return ['Missing username'];
    if(!password) return ['Missing password'];
    if(password.length < 6) return ['Password too short'];

    return [undefined, new RegisterUserDTO(username, password)];
  }
}