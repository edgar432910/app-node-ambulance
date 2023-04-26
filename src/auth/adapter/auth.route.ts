

import express from 'express'
import AuthController from './auth.controller'
import UserOperation from '@user/infraestructure/user.operation'
import { AuthUseCase } from '@auth/application/auth.usecase'

const operation = new UserOperation()
const useCase = new AuthUseCase(operation);
const controller = new AuthController(useCase)

const route = express.Router()

route.post('/login', controller.login.bind(controller));
route.get('/request-new-access-token/:refreshToken', controller.getNewAccessToken.bind(controller));

export default route;
