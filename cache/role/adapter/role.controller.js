"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RoleController {
    constructor(useCase) {
        this.useCase = useCase;
    }
    async list(req, res) {
        const result = await this.useCase.list({}, [], {
            name: 'ASC',
        });
        res.json(result);
    }
    async getOne(req, res) {
        const where = { id: +req.params.id };
        const result = await this.useCase.getOne(where);
        res.json(result);
    }
    async getPage(req, res) {
        const page = +req.params.page;
        const result = await this.useCase.getPage(page, {}, [], {
            name: 'ASC',
        });
        res.json(result);
    }
    async insert(req, res) {
        const body = req.body;
        const role = {
            name: body.name,
            actions: body.actions
        };
        const result = await this.useCase.insert(role);
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
exports.default = RoleController;
