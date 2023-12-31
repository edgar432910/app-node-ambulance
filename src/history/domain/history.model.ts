import { DriverModel } from "@driver/domain/driver.model";
import { MedicModel } from "@medic/domain/medic.model";

export interface History {
  numberHistory: string;
  medic: MedicModel;
  driver: DriverModel;
  symptoms: string;
  treatment: string;
  observations: string;
  date: Date;
  active: boolean;
  createAt: Date;
  updateAt: Date;
}
