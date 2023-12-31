import { DatabaseBootstrap } from "@bootstrap/database.boostrap";
import app from "./app";

import ServerBootstrap from "@bootstrap/server.bootstrap";
import RedisBootstrap from "@bootstrap/redis.boostrap";



(async () => {
  const serverBootstrap = new ServerBootstrap(app);
  const databaseBoostrap = new DatabaseBootstrap();
  const redisBootstrap = new RedisBootstrap();
  try {
    // const listPromises = [
    //   serverBootstrap.initialize(),
    //   databaseBoostrap.initialize(),
    //   redisBootstrap.initialize(),
    // ];
    // await Promise.all(listPromises);
    await serverBootstrap.initialize(),
    await databaseBoostrap.initialize(),
    await redisBootstrap.initialize(),
    console.log('Databases is running');

  } catch (err) {
    console.log(err);
    // process exit 1 error de funcionamiento, reinicie el node
    // process exit 0 se ejecuto correctamente
    databaseBoostrap.close();
    serverBootstrap.close();
    redisBootstrap.close();
    process.exit(1);
  }
})();

// async y await simplificacion para el manejo de promesas

// const promiseServer = serverBootstrap.initialize();

// promiseServer.then((res) => {
//   console.log("Server is ok ");
// });
// promiseServer.catch((err) => {
//   console.log(err);
// });
