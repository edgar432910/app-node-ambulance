"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("@user/adapter/user.route"));
const driver_route_1 = __importDefault(require("@driver/adapter/driver.route"));
const medic_route_1 = __importDefault(require("@medic/adapter/medic.route"));
const role_route_1 = __importDefault(require("@role/adapter/role.route"));
const auth_route_1 = __importDefault(require("@auth/adapter/auth.route"));
const errors_helper_1 = __importDefault(require("@shared/helpers/errors.helper"));
const multer_1 = __importDefault(require("multer"));
const authentication_guard_1 = require("@shared/guards/authentication.guard");
class App {
    constructor() {
        this.expressApp = (0, express_1.default)();
        this.init();
        this.mountMiddlewares();
        this.mountRoutes();
        this.mountErros();
    }
    init() {
        (0, multer_1.default)({
            limits: {
                fileSize: 8000000,
            },
        });
    }
    mountRoutes() {
        this.expressApp.use("/users", user_route_1.default);
        this.expressApp.use("/drivers", authentication_guard_1.AuthenticationGuard.canActivate, driver_route_1.default);
        this.expressApp.use("/medics", medic_route_1.default);
        this.expressApp.use("/roles", role_route_1.default);
        this.expressApp.use("/auth", auth_route_1.default);
    }
    mountErros() {
        // this.expressApp.use("**", ErrorHandle.notFound);
        this.expressApp.use(errors_helper_1.default.notFound);
        this.expressApp.use(errors_helper_1.default.generic);
    }
    mountMiddlewares() {
        this.expressApp.use(express_1.default.urlencoded({ extended: true }));
        // middleware se llama json, se le asign a requestbody
        this.expressApp.use(express_1.default.json());
    }
}
exports.default = new App().expressApp;
