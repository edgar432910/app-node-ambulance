import express from "express";
import routerUser from "./user/adapter/user.route";
import { Application } from "express";

class App {
  expressApp: Application;
  constructor() {
    this.expressApp = express();
    this.mountRoutes();
    this.mountErros();
  }
  mountRoutes() {
    this.expressApp.use("/users", routerUser);
  }
  mountErros() {
    this.expressApp.use("**", (request: any, response: any) => {
      console.log(`FF`);
      response.writeHead(404, { "content-type": "text/plain" });
      response.write("Not Found");
      response.end();
    });
  }
}
export default new App().expressApp;
