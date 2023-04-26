import { DriverModel } from "@driver/domain/driver.model";
import { DriverRepository } from "./driver.repository";
import { BaseUseCase } from "@shared/application/base.usecase";

export class DriverUseCase extends BaseUseCase<DriverModel, DriverRepository> {
  constructor(repository: DriverRepository) {
    super(repository);
  }
}
