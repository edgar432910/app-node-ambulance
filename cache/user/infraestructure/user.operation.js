"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("@entities/user.entity");
const base_operation_1 = require("@shared/infraestructure/base.operation");
class UserOperation extends base_operation_1.BaseOperation {
    constructor() {
        super(user_entity_1.User);
    }
}
exports.default = UserOperation;
