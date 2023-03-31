import app from "./app";

import ServerBootstrap from "./bootstrap/server.bootstrap";

const serverBootstrap = new ServerBootstrap(app);

(async () => {
  try {
    await serverBootstrap.initialize();
  } catch (err) {
    console.log(err);
    // process exit 1 error de funcionamiento, reinicie el node
    // process exit 0 se ejecuto correctamente
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
