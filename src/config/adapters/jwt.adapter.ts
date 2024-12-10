import jwt from 'jsonwebtoken';
import { envs } from '../envs';

const jwtSecretKey = envs.JWT_SECRET_KEY;

export class JwtAdapter {
  static async generateJsonWebToken(payload: any, duration: string) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, jwtSecretKey, { expiresIn: duration }, (error, token) => {
        if(error) {
          return reject(error);
        }

        return resolve(token);
      })
    });
  }

  static validateJsonWebToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, jwtSecretKey, (error, decoded) => {
        if(error) {
          return resolve(null);
        }

        return resolve(decoded as T);
      })
    })
  }
}