export class CreatePokemonDTO {

  private constructor(
    public name: string,
    public type: string,
    public level: number,
    public num: number,
    public trainerId: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, CreatePokemonDTO?] {
    const { name, type, level, num,  trainerId } = object;

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

    if(!num) {
      return ['Missing num'];
    }

    if(isNaN(num)) {
      return ['Num must be a number'];
    }

    if(!trainerId) {
      return ['Missing trainer id'];
    }

    return [undefined, new CreatePokemonDTO(name, type, level, num, trainerId)];
  }
}