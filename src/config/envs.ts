import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  JWT_SECRET_KEY: get('JWT_SECRET_KEY').required().asString(),
}



