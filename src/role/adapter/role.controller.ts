import RoleUseCase from "../application/role.usecase";
import { RoleModel } from "../domain/role.model";
import { Request, Response } from "express";

export default class RoleController {
    constructor(private useCase: RoleUseCase) { }

    async list(req: Request, res: Response) {
        const result = await this.useCase.list({}, [], {
            name: 'ASC',
        })
        res.json(result);
    }
    async getOne(req: Request, res: Response) {
        const where = { id: +req.params.id }
        const result = await this.useCase.getOne(where)
        res.json(result);
    }
    async getPage(req: Request, res: Response) {
        const page = +req.params.page;
        const result = await this.useCase.getPage(page, {}, [], {
            name: 'ASC',
        })
        res.json(result);
    }
    async insert(req: Request, res: Response) {
        const body = req.body;
        const role: RoleModel = {
            name: body.name,
            actions: body.actions
        }
        const result = await this.useCase.insert(role)
        res.json(result);
    }
    async update(req: Request, res: Response) {
        const body = req.body;
        const where = { id: +req.params.id }

        const result = await this.useCase.update(body, where)
        res.json(result);
    }
    async delete(req: Request, res: Response) {
        const where = { id: +req.params.id }
        const result = await this.useCase.delete(where)
        res.json(result);
    }

}