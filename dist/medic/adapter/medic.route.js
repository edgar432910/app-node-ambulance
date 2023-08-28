"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const medic_usecase_1=__importDefault(require("../application/medic.usecase")),medic_operation_1=__importDefault(require("../infraestructure/medic.operation")),express_1=__importDefault(require("express")),medic_controller_1=__importDefault(require("./medic.controller")),cache_middleware_1=__importDefault(require("../../shared/middlewares/cache.middleware")),operation=new medic_operation_1.default,useCase=new medic_usecase_1.default(operation),controller=new medic_controller_1.default(useCase),route=express_1.default.Router();route.get("/",cache_middleware_1.default.handle("MEDIC_LIST"),controller.list.bind(controller)),route.get("/unique",controller.getUniqueMedic.bind(controller)),route.get("/report",controller.getReportMedic.bind(controller)),route.get("/:id",controller.getOne.bind(controller)),route.get("/page/:page",controller.getPage.bind(controller)),route.post("/",controller.insert.bind(controller)),route.get("/page/:page",controller.getPage.bind(controller)),route.put("/:id",controller.update.bind(controller)),route.delete("/:id",controller.delete.bind(controller)),exports.default=route;