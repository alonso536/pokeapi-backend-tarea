import { MongoDatabase, envs } from './config'
import { AppRoutes } from './presentation/router';
import { Server } from './presentation/server';

(async()=> {
  await main();
})();

async function main() {
  if(envs.DATABASE_ENVIRONMENT === 'mongo') {
    await MongoDatabase.connect({ 
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  }

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}