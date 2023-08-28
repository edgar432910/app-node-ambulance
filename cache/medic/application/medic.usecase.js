"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_usecase_1 = require("@shared/application/base.usecase");
class MedicUseCase extends base_usecase_1.BaseUseCase {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
    async getUniqueMedic() {
        return await this.repository.getUniqueMedic();
    }
    async getReportMedic() {
        return await this.repository.getReportMedic();
    }
}
exports.default = MedicUseCase;
