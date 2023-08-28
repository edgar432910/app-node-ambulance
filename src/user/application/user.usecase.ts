import { UserModel } from "@user/domain/user.model";
import UserRepository from "./user.repository";
import { BaseUseCase } from "@shared/application/base.usecase";
import Result from "@shared/application/result.interface";
import { UserService } from "./user.service";
import RoleRepository from "@role/application/role.repository";
import { RoleModel } from "@role/domain/role.model";
import { FamilyRefreshTokens } from "@entities/family-refresh-tokens.entity";
import { FamilyRefreshTokensModel } from "@family-refreshtokens/domain/family-refreshtokens.model";
import { UserListDto } from "@user/domain/user-list.dto";
import AWS from "aws-sdk";
import yenv from "yenv";

const S3 = new AWS.S3();
const env = yenv();

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
    override async list(where: object = {}, relations: string[] = [], order: object = {}): Promise<Result<UserModel>> {
        where = { ...where, active: true };
        const list  = await this.repository.list(where, relations, order);
        return UserListDto.mapping(list);
      }
   async  getPhoto (where: object = {}) :Promise<any>{
        const result = await this.repository.getOne(where,[]);
        const user = result.payload.data as UserModel;
        const params = {Bucket:env.S3.bucketName, Key: user.photo};
        return await S3.getObject(params).promise();
    }

}