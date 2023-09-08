import express from "express";
import routerUser from "./user/adapter/user.route";
import routerDriver from "./driver/adapter/driver.route";
import routerMedic from "./medic/adapter/medic.route";
import routerRole from "./role/adapter/role.route";
import routerAuth from "./auth/adapter/auth.route";
import ErrorHandle from "./shared/helpers/errors.helper";
import { Application } from "express";
import multer from "multer";
import helmet from "helmet";
import permission_policy from 'permissions-policy';
import { AuthenticationGuard } from "./shared/guards/authentication.guard";
import yenv from "yenv";
import {Request, Response} from "express";

const env = yenv();
const domain = env.DOMAIN;

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
    multer({
      limits: {
        fileSize: 8000000,
      },
    });
  }
  mountMiddlewares() {
    this.expressApp.use(helmet());
    // limitar los permisos, los accesos
    this.expressApp.use(
      permission_policy({
        features: {
          geolocation: ['self', `"${domain}"`],
          camera: ['self', `"${domain}"`],
          microphone: ['self', `"${domain}"`],
          notifications: ['self', `"${domain}"`],
          push: ['self', `"${domain}"`],
        },
      })
    );
    this.expressApp.use(express.urlencoded({ extended: true }));
    // middleware se llama json, se le asign a requestbody
    this.expressApp.use(express.json());
  }

  mountRoutes() {
    this.expressApp.get('/', (req:Request, res:Response) => res.send("CODIGO COMPLETO before to test"));
    this.expressApp.use("/users", routerUser);
    this.expressApp.use("/drivers", AuthenticationGuard.canActivate, routerDriver);
    this.expressApp.use("/medics",AuthenticationGuard.canActivate, routerMedic);
    this.expressApp.use("/roles", routerRole);
    this.expressApp.use("/auth", routerAuth);

  }
  mountErros() {
    // this.expressApp.use("**", ErrorHandle.notFound);
    this.expressApp.use(ErrorHandle.notFound);
    this.expressApp.use(ErrorHandle.generic);
  }

}
export default new App().expressApp;
