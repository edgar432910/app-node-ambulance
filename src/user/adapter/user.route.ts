

import UserUseCase from '@user/application/user.usecase'
import express, { NextFunction, Request, Response } from 'express'
import UserController from './user.controller'
import UserOperation from '@user/infraestructure/user.operation'
import RoleOperation from '@role/infraestructure/role.operations'
import { AuthenticationGuard } from '@shared/guards/authentication.guard'
import { AuthorizationGuard } from '@shared/guards/authorization.guard'
import ErrorHandle, { IError } from '@shared/helpers/errors.helper'

const operation = new UserOperation()
const operationRole = new RoleOperation()
const useCase = new UserUseCase(operation, operationRole)
const controller = new UserController(useCase)
const route = express.Router()


route.get('/', AuthenticationGuard.canActivate, AuthorizationGuard.canActivate("LIST_USER"), ErrorHandle.catchError(controller.list.bind(controller)))

route.get('/:id', ErrorHandle.catchError(controller.getOne.bind(controller)))
route.get('/page/:page', controller.getPage.bind(controller))
route.post('/', controller.insert.bind(controller))
route.put('/:id', controller.update.bind(controller))
route.delete('/:id', controller.delete.bind(controller))

export default route;
