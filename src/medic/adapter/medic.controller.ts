import { ICache } from "../../shared/interfaces/cache.interface";
import RedisBootstrap from "../../bootstrap/redis.boostrap";
import MedicUseCase from "../application/medic.usecase";
import { MedicModel } from "../domain/medic.model";
import { Request, Response } from "express";
import logger from "../../shared/helpers/logging.helper";
import { Trace } from "../../shared/helpers/trace.helper";

export default class MedicController {
    constructor(private useCase: MedicUseCase, private cache:ICache) { }

    async list(req: Request, res: Response) {
        logger.info({
            typeElement: 'MedicController',
            typeAction: 'list',
            query: JSON.stringify({active:true, erased: 10}),
            traceId:Trace.getTraceId(true),
            message: 'Listing all medics'
        })
        const result = await this.useCase.list({}, [], {
            paternal_surname: 'ASC',
            maternal_surname: 'ASC',
            name: 'ASC',
        })
        this.cache.set(res.locals.cacheKey, JSON.stringify(result))
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
            paternal_surname: 'ASC',
            maternal_surname: 'ASC',
            name: 'ASC',
        })
        res.json(result);
    }
    async insert(req: Request, res: Response) {
        const body = req.body;
        const medic: MedicModel = {
            name: body.name,
            paternal_surname: body.paternal_surname,
            maternal_surname: body.maternal_surname,
            cmp: body.cmp,
            document: body.document,
            typeDocument: body.typeDocument
        }
        const result = await this.useCase.insert(medic);
        await this.cache.clear("MEDIC")
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
    async getUniqueMedic(req: Request, res: Response) {
        const result = await this.useCase.getUniqueMedic();
        res.json(result);
    }
    async getReportMedic(req: Request, res: Response) {
        const result = await this.useCase.getReportMedic();
        res.json(result);
    }
}