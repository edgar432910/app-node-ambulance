import UserUseCase from "../application/user.usecase";
import UserOperation from "../infraestructure/user.operation";

const userOperation = new UserOperation();
const userUseCase = new UserUseCase(userOperation);

export default class {
  list(request: any, response: any) {
    response.writeHead(200, { "content-type": "application/json" });
    response.write(JSON.stringify(userUseCase.list()));
    response.end();
  }
  getOne(request: any, response: any) {
    const age = +request.params.age;
    response.writeHead(200, { "content-type": "application/json" });
    response.write(JSON.stringify(userUseCase.getOne(age)));
    response.end();
  }
  insert(request: any, response: any) {
    console.log(`FF`);
    response.writeHead(200, { "content-type": "text/html" });
    response.write(`<h1>HOLA MUNDO</h1>`);
    response.end();
  }
}
