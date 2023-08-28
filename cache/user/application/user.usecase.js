"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_usecase_1 = require("@shared/application/base.usecase");
const user_service_1 = require("./user.service");
const family_refresh_tokens_entity_1 = require("@entities/family-refresh-tokens.entity");
const user_list_dto_1 = require("@user/domain/user-list.dto");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const yenv_1 = __importDefault(require("yenv"));
const S3 = new aws_sdk_1.default.S3();
const env = (0, yenv_1.default)();
class UserUseCase extends base_usecase_1.BaseUseCase {
    constructor(repository, repositoryRole) {
        super(repository);
        this.repository = repository;
        this.repositoryRole = repositoryRole;
    }
    async insert(entity) {
        const user = {
            ...entity,
        };
        //? obtener los roles 
        const listRolesPromises = [];
        user.roles.forEach((role) => {
            listRolesPromises.push(this.repositoryRole.getOne({ id: +role }, []));
        });
        const roles = await Promise.all(listRolesPromises);
        user.roles = roles.map((result) => result.payload.data);
        // ? password cifrado
        const refreshToken = user_service_1.UserService.generateRefreshToken();
        const familyRt = new family_refresh_tokens_entity_1.FamilyRefreshTokens();
        familyRt.refreshToken = refreshToken;
        const newModelRT = {
            refreshToken: refreshToken,
        };
        user.familyRefreshTokens = [newModelRT];
        user.password = await user_service_1.UserService.cryptPassword(user.password);
        const userInserted = await this.repository.insert(user);
        return userInserted;
    }
    async list(where = {}, relations = [], order = {}) {
        where = { ...where, active: true };
        const list = await this.repository.list(where, relations, order);
        return user_list_dto_1.UserListDto.mapping(list);
    }
    async getPhoto(where = {}) {
        const result = await this.repository.getOne(where, []);
        const user = result.payload.data;
        const params = { Bucket: env.S3.bucketName, Key: user.photo };
        return await S3.getObject(params).promise();
    }
}
exports.default = UserUseCase;
