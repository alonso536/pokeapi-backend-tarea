import { UserRepository, UserRepositoryImpl, UserRepositoryMongo, UserRepositoryPostgres } from '../repository';

export class UserFactory {

  static getUserRepository(environment: string): UserRepository {
    switch(environment) {
      case 'mongo':
        return UserRepositoryMongo.getInstance();
      case 'postgres':
        return UserRepositoryPostgres.getInstance();
      default:
        return UserRepositoryImpl.getInstance();
    }
  }
}