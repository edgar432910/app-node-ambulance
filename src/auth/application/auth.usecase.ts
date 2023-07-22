import { TokensModel } from "@auth/domain/tokens.model";
import Result from "@shared/application/result.interface";
import { UserModel } from "@user/domain/user.model";
import { AuthRepository } from "./auth.repository";
import UserRepository from "@user/application/user.repository";
import { UserService } from "@user/application/user.service";
import { ResponseDto } from "@shared/application/response.dto";
import { compareAsc, add } from "date-fns";
import { FamilyRefreshTokens } from "@entities/family-refresh-tokens.entity";
import FamilyRefreshTokensRepository from "@family-refreshtokens/application/family-refreshtokens.repository";
import { FamilyRefreshTokensModel } from "@family-refreshtokens/domain/family-refreshtokens.model";
export class AuthUseCase {
    constructor(private repository: UserRepository, private repositoryFamilyRefreshTokens: FamilyRefreshTokensRepository) {

    }
    async login(user: Partial<UserModel>): Promise<Result<TokensModel>> {
        const result: Result<UserModel> = await this.repository.getOne({ email: user.email }, ["roles", "familyRefreshTokens"]);
        const userMatched: UserModel = result.payload.data as UserModel;
        if (!userMatched) return null;
        const isPasswordValid = await UserService.decryptPassword(user.password, userMatched.password);
        if (!isPasswordValid) return null;
        const newValue = UserService.generateRefreshToken();
        //? se crea un new AccesToken y se tiene que invalidar los anteriores
        console.log({userMatched});
        // const resultFamilyRefreshToken = await this.repositoryFamilyRefreshTokens.update({ status: false }, { user: userMatched.id }, []);
        // const familyRefreshTokensMatched: FamilyRefreshTokensModel[] = resultFamilyRefreshToken.payload.data as FamilyRefreshTokensModel[]
        const newRt = new FamilyRefreshTokens();
        newRt.refreshToken = newValue;
        const newModelRt: FamilyRefreshTokensModel = {
            refreshToken: newValue,
            user: userMatched
        }
        const entityFamily = {status:false}
        const familyRefreshTokensMatched = userMatched.familyRefreshTokens.map((record)=>{
            return Object.assign(record,entityFamily);
        });
        userMatched.familyRefreshTokens= familyRefreshTokensMatched;

        // userMatched.familyRefreshTokens = familyRefreshTokensMatched;
        userMatched.familyRefreshTokens.push(newModelRt);
        await this.repository.update(userMatched, { id: userMatched.id }, []);

        const tokens: TokensModel = {
            accessToken: UserService.generateAccessToken(userMatched),
            refreshToken: newValue
        }
        return ResponseDto.format("", tokens);
    }

    async getNewAccessToken(refreshToken: string): Promise<Result<TokensModel>> {
        const result: Result<FamilyRefreshTokensModel> = await this.repositoryFamilyRefreshTokens.getOne(
            { refreshToken, status: true },
            ["user"])
        const refreshTokenMatched: FamilyRefreshTokensModel = result.payload.data as FamilyRefreshTokensModel;
        if (!refreshTokenMatched) return null;
        await this.repositoryFamilyRefreshTokens.update({ status: false }, { user: refreshTokenMatched.user.id }, []);
        const user:Result<UserModel> = await this.repository.getOne({id:refreshTokenMatched.user.id},["familyRefreshTokens"])
        
        const newValue = UserService.generateRefreshToken();
        const newRt = new FamilyRefreshTokens();
        newRt.refreshToken = newValue;
        const newModelRt: FamilyRefreshTokensModel = {
            refreshToken: newValue,
            user: refreshTokenMatched.user
        }
        const userMatched:UserModel = user.payload.data as UserModel;
        userMatched.familyRefreshTokens.push(newModelRt);
        await this.repository.update(userMatched, { id: userMatched.id }, []);

        const tokens: TokensModel = {
            accessToken: UserService.generateAccessToken(refreshTokenMatched.user),
            refreshToken: newValue
        }
   
        return ResponseDto.format("", tokens);

    }

}