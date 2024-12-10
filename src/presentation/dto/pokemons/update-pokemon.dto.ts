export class UpdatePokemonDTO {

  private constructor(
    public name: string,
    public type: string,
    public level: number,
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdatePokemonDTO?] {
    const { name, type, level } = object;

    if(!name) {
      return ['Missing name'];
    }

    if(!type) {
      return ['Missing type'];
    }

    if(!level) {
      return ['Missing level'];
    }

    if(isNaN(level)) {
      return ['Level must be a number'];
    }

    return [undefined, new UpdatePokemonDTO(name, type, level)];
  }
}