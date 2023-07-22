import { FamilyRefreshTokens } from "@entities/family-refresh-tokens.entity";
import { FamilyRefreshTokensModel } from "../domain/family-refreshtokens.model";
import { BaseOperation } from "@shared/infraestructure/base.operation";
import FamilyRefreshTokensRepository from "../application/family-refreshtokens.repository";


export default class FamilyRefreshTokensOperation extends BaseOperation<FamilyRefreshTokensModel>
    implements FamilyRefreshTokensRepository {
    constructor() {
        super(FamilyRefreshTokens)
    }

}