import { UserModel } from "@user/domain/user.model";
import { TokensModel } from "../domain/tokens.model";
import Result from "@shared/application/result.interface";


export interface AuthRepository{
    login(auth:Partial<UserModel>):Promise<Result<TokensModel>>
    getNewAccessToken(auth:Partial<UserModel>):Promise<Result<TokensModel>>

}
