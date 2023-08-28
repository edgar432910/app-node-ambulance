"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const family_refresh_tokens_entity_1 = require("@entities/family-refresh-tokens.entity");
const base_operation_1 = require("@shared/infraestructure/base.operation");
class FamilyRefreshTokensOperation extends base_operation_1.BaseOperation {
    constructor() {
        super(family_refresh_tokens_entity_1.FamilyRefreshTokens);
    }
}
exports.default = FamilyRefreshTokensOperation;
