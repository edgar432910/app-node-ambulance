"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_boostrap_1 = require("@bootstrap/database.boostrap");
const medic_entity_1 = require("@entities/medic.entity");
const base_operation_1 = require("@shared/infraestructure/base.operation");
const response_dto_1 = require("@shared/application/response.dto");
class MedicOperation extends base_operation_1.BaseOperation {
    constructor() {
        super(medic_entity_1.Medic);
    }
    async getUniqueMedic() {
        const repository = database_boostrap_1.DatabaseBootstrap.dataSource.getRepository(medic_entity_1.Medic);
        const data = await repository
            .createQueryBuilder('medic')
            .select(["distinct medic.cmp"])
            .where("active = true")
            .getRawMany();
        // .distinctOn(["medic.cmp"]) es para postrgres
        // ,"medic.id", "medic.name", "medic.paternal_surname","medic.maternal_surname"
        // ?.distinct(true); filtra todas las columna
        // ? darle la forma del result 
        return response_dto_1.ResponseDto.format("", data);
    }
    async getReportMedic() {
        const repository = database_boostrap_1.DatabaseBootstrap.dataSource.getRepository(medic_entity_1.Medic);
        // ?quiero traer medicos activos o no 
        const data = await repository
            .createQueryBuilder()
            .select(["id", "cmp", "paternal_surname", "maternal_surname", "active"])
            .orderBy("active", "DESC")
            .addOrderBy("paternal_surname", "ASC")
            .addOrderBy("maternal_surname", "ASC")
            .getRawMany();
        return response_dto_1.ResponseDto.format("", data);
    }
}
exports.default = MedicOperation;
