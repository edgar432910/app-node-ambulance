import { DriverRepository } from "@driver/application/driver.repository";
import { DriverModel } from "@driver/domain/driver.model";
import { Driver } from "@entities/driver.entity";
import { BaseOperation } from "@shared/infraestructure/base.operation";

export class DriverOperation
  extends BaseOperation<DriverModel>
  implements DriverRepository
{
  constructor() {
    super(Driver);
  }
}
