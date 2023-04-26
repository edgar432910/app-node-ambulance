

import RoleUseCase from '@role/application/role.usecase'
import express from 'express'
import RoleOperation from '@role/infraestructure/role.operations'
import RoleController from './role.controller'

const operation = new RoleOperation()
const useCase = new RoleUseCase(operation)
const controller = new RoleController(useCase)

const route = express.Router()
route.get('/', controller.list.bind(controller))

route.get('/:id', controller.getOne.bind(controller))
route.get('/page/:page', controller.getPage.bind(controller))
route.post('/', controller.insert.bind(controller))
route.put('/:id', controller.update.bind(controller))
route.delete('/:id', controller.delete.bind(controller))

export default route;
