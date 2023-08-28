"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseUseCase = void 0;
const yenv_1 = __importDefault(require("yenv"));
const env = (0, yenv_1.default)();
class BaseUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    list(where = {}, relations = [], order = {}) {
        where = { ...where, active: true };
        return this.repository.list(where, relations, order);
    }
    getOne(where = {}, relations = []) {
        where = { ...where, active: true };
        return this.repository.getOne(where, relations);
    }
    getPage(page, where = {}, relations = [], order = {}) {
        where = { ...where, active: true };
        const pageSize = env.APP.PAGE_SIZE;
        return this.repository.getPage(page, pageSize, where, relations, order);
    }
    insert(entity) {
        return this.repository.insert(entity);
    }
    update(entity, where = {}, relations = []) {
        return this.repository.update(entity, where, relations);
    }
    delete(where) {
        const entity = { active: false };
        return this.repository.update(entity, where, []);
    }
}
exports.BaseUseCase = BaseUseCase;
