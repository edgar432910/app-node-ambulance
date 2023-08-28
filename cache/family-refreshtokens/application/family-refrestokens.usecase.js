"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_usecase_1 = require("@shared/application/base.usecase");
class FamilyRefreshTokenUseCase extends base_usecase_1.BaseUseCase {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
}
exports.default = FamilyRefreshTokenUseCase;
