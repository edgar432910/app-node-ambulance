"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const user_operation_1 = __importDefault(require("@user/infraestructure/user.operation"));
const auth_usecase_1 = require("@auth/application/auth.usecase");
const family_refreshtokens_operation_1 = __importDefault(require("@family-refreshtokens/infraestructure/family-refreshtokens.operation"));
const operation = new user_operation_1.default();
const operationFamilyResfreshTokens = new family_refreshtokens_operation_1.default();
const useCase = new auth_usecase_1.AuthUseCase(operation, operationFamilyResfreshTokens);
const controller = new auth_controller_1.default(useCase);
const route = express_1.default.Router();
route.post('/login', controller.login.bind(controller));
route.get('/request-new-access-token/:refreshToken', controller.getNewAccessToken.bind(controller));
exports.default = route;
