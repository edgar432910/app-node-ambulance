

import express from 'express'
import AuthController from './auth.controller'
import UserOperation from '@user/infraestructure/user.operation'
import { AuthUseCase } from '@auth/application/auth.usecase'
import FamilyRefreshTokensOperation from 'src/family-refreshtokens/infraestructure/family-refreshtokens.operation'

const operation = new UserOperation()
const operationFamilyResfreshTokens = new FamilyRefreshTokensOperation()
const useCase = new AuthUseCase(operation, operationFamilyResfreshTokens);
const controller = new AuthController(useCase)

const route = express.Router()

route.post('/login', controller.login.bind(controller));
route.get('/request-new-access-token/:refreshToken', controller.getNewAccessToken.bind(controller));

export default route;
