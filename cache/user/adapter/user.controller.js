"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functionReject = () => new Promise((resolve, reject) => {
    const error = new Error('Error de promesa');
    error.status = 502;
    reject(error);
});
class UserController {
    constructor(useCase) {
        this.useCase = useCase;
    }
    async list(req, res) {
        const result = await this.useCase.list({}, [], {
            lastname: 'ASC',
            name: 'ASC'
        });
        // const result = await functionReject();
        res.json(result);
    }
    async getOne(req, res) {
        const where = { id: +req.params.id };
        const result = await this.useCase.getOne(where);
        res.json(result);
    }
    async getPhoto(req, res) {
        const where = { id: +req.params.id };
        const result = await this.useCase.getPhoto(where);
        const obj = Buffer.from(result.Body).toString("utf-8");
        res.type("image/png").send(obj);
    }
    async getPage(req, res) {
        const page = +req.params.page;
        const result = await this.useCase.getPage(page, {}, [], {
            lastname: 'ASC',
            name: 'ASC'
        });
        res.json(result);
    }
    async insert(req, res) {
        console.log('Inserting');
        const body = req.body;
        const user = {
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            password: body.password,
            roles: body.roles,
            photo: body.photo
        };
        const result = await this.useCase.insert(user);
        res.json(result);
    }
    async update(req, res) {
        const body = req.body;
        const where = { id: +req.params.id };
        const result = await this.useCase.update(body, where);
        res.json(result);
    }
    async delete(req, res) {
        const where = { id: +req.params.id };
        const result = await this.useCase.delete(where);
        res.json(result);
    }
}
exports.default = UserController;
