

import UserUseCase from '@user/application/user.usecase'
import express, { NextFunction, Request, Response } from 'express'
import UserController from './user.controller'
import UserOperation from '@user/infraestructure/user.operation'
import RoleOperation from '@role/infraestructure/role.operations'
import { AuthenticationGuard } from '@shared/guards/authentication.guard'
import { AuthorizationGuard } from '@shared/guards/authorization.guard'
import ErrorHandle, { IError } from '@shared/helpers/errors.helper'
import { UploadMiddleware } from '@shared/middlewares/upload.middleware'

const operation = new UserOperation()
const operationRole = new RoleOperation()
const useCase = new UserUseCase(operation, operationRole)
const controller = new UserController(useCase)
const route = express.Router()


route.get('/', AuthenticationGuard.canActivate, AuthorizationGuard.canActivate("LIST_USER"), ErrorHandle.catchError(controller.list.bind(controller)))

route.get('/:id', ErrorHandle.catchError(controller.getOne.bind(controller)))
route.get('/photo/:id', ErrorHandle.catchError(controller.getPhoto.bind(controller)))
route.get('/page/:page', ErrorHandle.catchError(controller.getPage.bind(controller)))
route.post('/',
    UploadMiddleware.S3("photo", 4000000,'users/photos', false, "image/png", "image/jpeg"),
    ErrorHandle.catchError(controller.insert.bind(controller)))
route.put('/:id', ErrorHandle.catchError(controller.update.bind(controller)))
route.delete('/:id', controller.delete.bind(controller))

export default route;
