import { DatabaseBootstrap } from "@bootstrap/database.boostrap";
import { Medic } from "@entities/medic.entity";
import MedicRepository from "@medic/application/medic.repository";
import { MedicModel } from "@medic/domain/medic.model";
import Result from "@shared/application/result.interface";
import { BaseOperation } from "@shared/infraestructure/base.operation";
import { ResponseDto } from "@shared/infraestructure/response.dto";
import { Repository } from "typeorm";

export default class MedicOperation extends BaseOperation<MedicModel> implements MedicRepository {
    constructor() {
        super(Medic)
    }
    async getUniqueMedic(): Promise<Result<MedicModel>> {
        const repository: Repository<MedicModel> = DatabaseBootstrap.dataSource.getRepository(Medic);
        const data: MedicModel[] = await repository
            .createQueryBuilder('medic')
            .select(["distinct medic.cmp"])
            .where("active = true")
            .getRawMany()

        // .distinctOn(["medic.cmp"]) es para postrgres
        // ,"medic.id", "medic.name", "medic.paternal_surname","medic.maternal_surname"
        // ?.distinct(true); filtra todas las columna
        // ? darle la forma del result 
        return ResponseDto.format("", data);
    }
    async getReportMedic(): Promise<Result<MedicModel>> {
        const repository: Repository<MedicModel> = DatabaseBootstrap.dataSource.getRepository(Medic);
        // ?quiero traer medicos activos o no 
        const data: MedicModel[] = await repository
            .createQueryBuilder()
            .select(["id", "cmp", "paternal_surname", "maternal_surname", "active"])
            .orderBy("active", "DESC")
            .addOrderBy("paternal_surname", "ASC")
            .addOrderBy("maternal_surname", "ASC")
            .getRawMany()
        return ResponseDto.format("", data);

    }
}