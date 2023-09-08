import { User } from "../../entities/user.entity";
import UserRepository from "../application/user.repository";
import { UserModel } from "../domain/user.model";
import { BaseOperation } from "../../shared/infraestructure/base.operation";

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