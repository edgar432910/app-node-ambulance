"use strict";
// import { DriverUseCase } from "@driver/application/driver.usecase";
// import { DriverOperation } from "@driver/infraestructure/driver.operation";
// import Controller from "@driver/adapter/driver.controller";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
// const driverOperation = new DriverOperation();
// const driverUseCase = new DriverUseCase(driverOperation);
// const controller = new Controller(driverUseCase);
// route.get("/", controller.list.bind(controller));
// route.get("/:id", controller.getOne.bind(controller));
// route.post("/", controller.insert.bind(controller));
// route.put("/:id", controller.update.bind(controller));
// route.delete("/:id", controller.delete.bind(controller));
exports.default = route;
