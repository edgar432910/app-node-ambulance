"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseOperation = void 0;
const database_boostrap_1 = require("@bootstrap/database.boostrap");
const response_dto_1 = require("../application/response.dto");
const _ = __importStar(require("lodash"));
class BaseOperation {
    constructor(entity) {
        this.entity = entity;
    }
    async list(where = {}, relations = [], order = {}) {
        const repository = database_boostrap_1.DatabaseBootstrap.dataSource.getRepository(this.entity);
        const data = await repository.find({ where, relations, order });
        // ? darle la forma del result 
        return response_dto_1.ResponseDto.format("", data);
    }
    async getOne(where = {}, relations = []) {
        const repository = database_boostrap_1.DatabaseBootstrap.dataSource.getRepository(this.entity);
        const data = await repository.findOne({ where, relations });
        // ? darle la forma del result 
        return response_dto_1.ResponseDto.format("", data);
    }
    async getPage(page, pageSize, where = {}, relations = [], order = {}) {
        const repository = database_boostrap_1.DatabaseBootstrap.dataSource.getRepository(this.entity);
        const [data, total] = await repository.findAndCount({
            where, relations, order, skip: page * pageSize, take: pageSize
        });
        return response_dto_1.ResponseDto.format("", data, total);
    }
    async insert(entity) {
        const repository = database_boostrap_1.DatabaseBootstrap.dataSource.getRepository(this.entity);
        const instance = repository.create(entity);
        const data = await repository.save(instance);
        return response_dto_1.ResponseDto.format('', data);
    }
    async update(entity, where = {}, relations = []) {
        const repository = database_boostrap_1.DatabaseBootstrap.dataSource.getRepository(this.entity);
        let recordsToUpdate = await repository.find({ where, relations });
        recordsToUpdate = recordsToUpdate.map((record) => _.merge(record, entity));
        await repository.save(recordsToUpdate);
        return response_dto_1.ResponseDto.format('', recordsToUpdate);
    }
    async delete(where) {
        throw new Error('not implemented');
    }
}
exports.BaseOperation = BaseOperation;
