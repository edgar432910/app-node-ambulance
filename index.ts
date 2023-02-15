import express, { response } from "express";
import http from "http";

const server = http.createServer((request, response) => {
  // request. la peticion, del body
  // res: para responder
  // 404 no encuentra ruta
  // 401, no esta autenticado
  // 409 autenticado pero no autorizado
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.write("Hola mundo");
  response.end();
});

// habilidar un puerto
server.listen(3000, () => console.log(`Server is listening on port 3000`));
