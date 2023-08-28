"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUseCase = void 0;
const user_service_1 = require("@user/application/user.service");
const response_dto_1 = require("@shared/application/response.dto");
const family_refresh_tokens_entity_1 = require("@entities/family-refresh-tokens.entity");
class AuthUseCase {
    constructor(repository, repositoryFamilyRefreshTokens) {
        this.repository = repository;
        this.repositoryFamilyRefreshTokens = repositoryFamilyRefreshTokens;
    }
    async login(user) {
        const result = await this.repository.getOne({ email: user.email }, ["roles", "familyRefreshTokens"]);
        const userMatched = result.payload.data;
        if (!userMatched)
            return null;
        const isPasswordValid = await user_service_1.UserService.decryptPassword(user.password, userMatched.password);
        if (!isPasswordValid)
            return null;
        const newValue = user_service_1.UserService.generateRefreshToken();
        //? se crea un new AccesToken y se tiene que invalidar los anteriores
        console.log({ userMatched });
        // const resultFamilyRefreshToken = await this.repositoryFamilyRefreshTokens.update({ status: false }, { user: userMatched.id }, []);
        // const familyRefreshTokensMatched: FamilyRefreshTokensModel[] = resultFamilyRefreshToken.payload.data as FamilyRefreshTokensModel[]
        const newRt = new family_refresh_tokens_entity_1.FamilyRefreshTokens();
        newRt.refreshToken = newValue;
        const newModelRt = {
            refreshToken: newValue,
            user: userMatched
        };
        const entityFamily = { status: false };
        const familyRefreshTokensMatched = userMatched.familyRefreshTokens.map((record) => {
            return Object.assign(record, entityFamily);
        });
        userMatched.familyRefreshTokens = familyRefreshTokensMatched;
        // userMatched.familyRefreshTokens = familyRefreshTokensMatched;
        userMatched.familyRefreshTokens.push(newModelRt);
        await this.repository.update(userMatched, { id: userMatched.id }, []);
        const tokens = {
            accessToken: user_service_1.UserService.generateAccessToken(userMatched),
            refreshToken: newValue
        };
        return response_dto_1.ResponseDto.format("", tokens);
    }
    async getNewAccessToken(refreshToken) {
        const result = await this.repositoryFamilyRefreshTokens.getOne({ refreshToken, status: true }, ["user"]);
        const refreshTokenMatched = result.payload.data;
        if (!refreshTokenMatched)
            return null;
        await this.repositoryFamilyRefreshTokens.update({ status: false }, { user: refreshTokenMatched.user.id }, []);
        const user = await this.repository.getOne({ id: refreshTokenMatched.user.id }, ["familyRefreshTokens"]);
        const newValue = user_service_1.UserService.generateRefreshToken();
        const newRt = new family_refresh_tokens_entity_1.FamilyRefreshTokens();
        newRt.refreshToken = newValue;
        const newModelRt = {
            refreshToken: newValue,
            user: refreshTokenMatched.user
        };
        const userMatched = user.payload.data;
        userMatched.familyRefreshTokens.push(newModelRt);
        await this.repository.update(userMatched, { id: userMatched.id }, []);
        const tokens = {
            accessToken: user_service_1.UserService.generateAccessToken(refreshTokenMatched.user),
            refreshToken: newValue
        };
        return response_dto_1.ResponseDto.format("", tokens);
    }
}
exports.AuthUseCase = AuthUseCase;
