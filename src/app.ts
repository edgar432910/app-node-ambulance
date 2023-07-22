import express from "express";
import routerUser from "@user/adapter/user.route";
import routerDriver from "@driver/adapter/driver.route";
import routerMedic from "@medic/adapter/medic.route";
import routerRole from "@role/adapter/role.route";
import routerAuth from "@auth/adapter/auth.route";
import ErrorHandle from "@shared/helpers/errors.helper";
import { Application } from "express";
import multer from "multer"
import { AuthenticationGuard } from "@shared/guards/authentication.guard";

class App {
  expressApp: Application;
  constructor() {
    this.expressApp = express();
    this.init()
    this.mountMiddlewares();
    this.mountRoutes();
    this.mountErros();
  }

  init(){
    multer();
  }

  mountRoutes() {
    this.expressApp.use("/users", routerUser);
    this.expressApp.use("/drivers", AuthenticationGuard.canActivate, routerDriver);
    this.expressApp.use("/medics", routerMedic);
    this.expressApp.use("/roles", routerRole);
    this.expressApp.use("/auth", routerAuth);

  }
  mountErros() {
    // this.expressApp.use("**", ErrorHandle.notFound);
    this.expressApp.use(ErrorHandle.notFound);
    this.expressApp.use(ErrorHandle.generic);
  }
  mountMiddlewares() {
    this.expressApp.use(express.urlencoded({ extended: true }));
    // middleware se llama json, se le asign a requestbody
    this.expressApp.use(express.json());
  }
}
export default new App().expressApp;
