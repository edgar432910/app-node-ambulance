"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverOperation = void 0;
const driver_entity_1 = require("@entities/driver.entity");
const base_operation_1 = require("@shared/infraestructure/base.operation");
class DriverOperation extends base_operation_1.BaseOperation {
    constructor() {
        super(driver_entity_1.Driver);
    }
}
exports.DriverOperation = DriverOperation;
