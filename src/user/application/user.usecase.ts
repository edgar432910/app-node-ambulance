import { UserModel } from "@user/domain/user.model";
import UserRepository from "./user.repository";
import { BaseUseCase } from "@shared/application/base.usecase";
import Result from "@shared/application/result.interface";
import { UserService } from "./user.service";
import RoleRepository from "@role/application/role.repository";
import { RoleModel } from "@role/domain/role.model";
import { FamilyRefreshTokens } from "@entities/family-refresh-tokens.entity";
import { FamilyRefreshTokensModel } from "src/family-refreshtokens/domain/family-refreshtokens.model";



export default class UserUseCase extends BaseUseCase<UserModel, UserRepository>{
    constructor(public repository: UserRepository,
        private repositoryRole: RoleRepository,
    ) {
        super(repository);
    }

    override async insert(entity: Partial<UserModel>): Promise<Result<UserModel>> {
        const user: UserModel = {
            ...entity,
        } as UserModel;
        //? obtener los roles 
        const listRolesPromises: any[] = [];
        user.roles.forEach((role) => {
            listRolesPromises.push(this.repositoryRole.getOne({ id: +role }, []))
        })
        const roles: Result<RoleModel>[] = await Promise.all(listRolesPromises);
        user.roles = roles.map((result: Result<RoleModel>) => result.payload.data as RoleModel)
        // ? password cifrado
        const refreshToken = UserService.generateRefreshToken();
        const familyRt = new FamilyRefreshTokens();
        familyRt.refreshToken = refreshToken;
        const newModelRT: FamilyRefreshTokensModel = {
            refreshToken: refreshToken,
        };
        user.familyRefreshTokens = [newModelRT];
        user.password = await UserService.cryptPassword(user.password);
        const userInserted: Result<UserModel> = await this.repository.insert(user);


        return userInserted;
    }

}