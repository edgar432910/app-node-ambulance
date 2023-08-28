"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_entity_1 = require("@entities/role.entity");
const base_operation_1 = require("@shared/infraestructure/base.operation");
class RoleOperation extends base_operation_1.BaseOperation {
    constructor() {
        super(role_entity_1.Role);
    }
}
exports.default = RoleOperation;
