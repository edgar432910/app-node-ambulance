"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_usecase_1 = __importDefault(require("@user/application/user.usecase"));
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./user.controller"));
const user_operation_1 = __importDefault(require("@user/infraestructure/user.operation"));
const role_operations_1 = __importDefault(require("@role/infraestructure/role.operations"));
const authentication_guard_1 = require("@shared/guards/authentication.guard");
const authorization_guard_1 = require("@shared/guards/authorization.guard");
const errors_helper_1 = __importDefault(require("@shared/helpers/errors.helper"));
const upload_builder_1 = require("@shared/application/upload-builder");
const upload_middleware_1 = require("@shared/middlewares/upload.middleware");
const operation = new user_operation_1.default();
const operationRole = new role_operations_1.default();
const useCase = new user_usecase_1.default(operation, operationRole);
const controller = new user_controller_1.default(useCase);
const route = express_1.default.Router();
const uploadMiddleware = new upload_middleware_1.FactoryAWS();
route.get('/', authentication_guard_1.AuthenticationGuard.canActivate, authorization_guard_1.AuthorizationGuard.canActivate("LIST_USER"), errors_helper_1.default.catchError(controller.list.bind(controller)));
route.get('/:id', errors_helper_1.default.catchError(controller.getOne.bind(controller)));
route.get('/photo/:id', errors_helper_1.default.catchError(controller.getPhoto.bind(controller)));
route.get('/page/:page', errors_helper_1.default.catchError(controller.getPage.bind(controller)));
route.post('/', uploadMiddleware.save(new upload_builder_1.UploadBuilder()
    .addFieldName('photo')
    .addMaxFileSize(100000000)
    .addDirectory('users/photos')
    .addIsPublic(true)
    .addMimeTypesAllowed(["image/png", "image/jpeg"])
    .build()
// {fieldName:"photo", maxFileSize:4000000, directory:"users/photos",
// isPublic:false, mimeTypesAllowed:["image/png", "image/jpeg"]} as IUpload
// "photo", 4000000,'users/photos', false, "image/png", "image/jpeg"
), errors_helper_1.default.catchError(controller.insert.bind(controller)));
route.put('/:id', errors_helper_1.default.catchError(controller.update.bind(controller)));
route.delete('/:id', controller.delete.bind(controller));
exports.default = route;
