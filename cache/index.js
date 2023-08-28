"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_boostrap_1 = require("@bootstrap/database.boostrap");
const app_1 = __importDefault(require("./app"));
const server_bootstrap_1 = __importDefault(require("@bootstrap/server.bootstrap"));
const redis_boostrap_1 = __importDefault(require("@bootstrap/redis.boostrap"));
(async () => {
    const serverBootstrap = new server_bootstrap_1.default(app_1.default);
    const databaseBoostrap = new database_boostrap_1.DatabaseBootstrap();
    const redisBootstrap = new redis_boostrap_1.default();
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
    }
    catch (err) {
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
