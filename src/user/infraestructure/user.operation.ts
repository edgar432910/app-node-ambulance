import { User } from "@entities/user.entity";
import UserRepository from "@user/application/user.repository";
import { UserModel } from "@user/domain/user.model";
import { BaseOperation } from "@shared/infraestructure/base.operation";
import { DatabaseBootstrap } from "@bootstrap/database.boostrap";
import { Repository } from "typeorm";

export default class UserOperation extends BaseOperation<UserModel> implements UserRepository {
    constructor() {
        super(User)
    }
//    async getPhoto(where: object): Promise<any> {
//     const repository: Repository<UserModel> = DatabaseBootstrap.dataSource.getRepository(this.entity);
//     const data: UserModel = await repository.findOne({ where});
//     // todo: get photo for user
//     const key = data.photo;

    
//     }

}