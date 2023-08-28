"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_boostrap_1 = __importDefault(require("@bootstrap/redis.boostrap"));
class MedicController {
    constructor(useCase) {
        this.useCase = useCase;
    }
    async list(req, res) {
        const result = await this.useCase.list({}, [], {
            paternal_surname: 'ASC',
            maternal_surname: 'ASC',
            name: 'ASC',
        });
        redis_boostrap_1.default.set(res.locals.cacheKey, JSON.stringify(result));
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
            paternal_surname: 'ASC',
            maternal_surname: 'ASC',
            name: 'ASC',
        });
        res.json(result);
    }
    async insert(req, res) {
        const body = req.body;
        const medic = {
            name: body.name,
            paternal_surname: body.paternal_surname,
            maternal_surname: body.maternal_surname,
            cmp: body.cmp,
            document: body.document,
            typeDocument: body.typeDocument
        };
        const result = await this.useCase.insert(medic);
        await redis_boostrap_1.default.clear("MEDIC");
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
    async getUniqueMedic(req, res) {
        const result = await this.useCase.getUniqueMedic();
        res.json(result);
    }
    async getReportMedic(req, res) {
        const result = await this.useCase.getReportMedic();
        res.json(result);
    }
}
exports.default = MedicController;
