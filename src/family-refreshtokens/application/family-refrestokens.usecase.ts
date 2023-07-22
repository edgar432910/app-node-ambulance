import { FamilyRefreshTokensModel } from "../domain/family-refreshtokens.model";
import { BaseUseCase } from "@shared/application/base.usecase";
import FamilyRefreshTokensRepository from "./family-refreshtokens.repository";


export default class FamilyRefreshTokenUseCase extends BaseUseCase<FamilyRefreshTokensModel, FamilyRefreshTokensRepository>{
    constructor(public repository: FamilyRefreshTokensRepository) {
        super(repository);
    }

   

}