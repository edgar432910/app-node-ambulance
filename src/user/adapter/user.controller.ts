import { IError } from "@shared/helpers/errors.helper";
import UserUseCase from "@user/application/user.usecase";
import { UserModel } from "@user/domain/user.model";
import { Request, Response } from "express";

const functionReject = ()=> new Promise((resolve, reject) => {
    const error:IError = new Error('Error de promesa');
    error.status =502;
    reject(error)
})

export default class UserController {
    constructor(private useCase: UserUseCase) { }

    async list(req: Request, res: Response) {
        const result = await this.useCase.list({}, [], {
            lastname: 'ASC',
            name:'ASC'
        })
        // const result = await functionReject();
        res.json(result);
    }
    async getOne(req: Request, res: Response) {
        const where = { id: +req.params.id }
        const result = await this.useCase.getOne(where)
        res.json(result);
    }
    async getPhoto(req: Request, res: Response) {
        const where = { id: +req.params.id }
        const result = await this.useCase.getPhoto(where);
        const obj= Buffer.from(result.Body).toString("utf-8");
        
        res.type("image/png").send(obj);
    }
    async getPage(req: Request, res: Response) {
        const page = +req.params.page;
        const result = await this.useCase.getPage(page, {}, [], {
            lastname: 'ASC',
            name:'ASC'
        })
        res.json(result);
    }
    async insert(req: Request, res: Response) {
        console.log('Inserting')
        const body = req.body;
        const user: Partial< UserModel> = {
            name: body.name,
            lastname:body.lastname,
            email:body.email,
            password:body.password,
            roles:body.roles,
            photo:body.photo
        }
        const result = await this.useCase.insert(user)
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