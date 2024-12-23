import { v4 as uuid, validate } from 'uuid';

export class UUID {
  static getDefaultUUID = () => uuid();
  static isValidUUID = (uuid: string) => validate(uuid);
}