import { RoleModel } from "../domain/role.model";
import RoleRepository from "./role.repository";
import { BaseUseCase } from "../../shared/application/base.usecase";



export default class RoleUseCase extends BaseUseCase<RoleModel,RoleRepository>{
    constructor(public repository:RoleRepository){
        super(repository);
    }
  
}