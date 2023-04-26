
import { AuthUseCase } from "@auth/application/auth.usecase";
import { TokensModel } from "@auth/domain/tokens.model";
import Result from "@shared/application/result.interface";
import UserUseCase from "@user/application/user.usecase";
import { UserModel } from "@user/domain/user.model";
import { Request, Response } from "express";

export default class AuthController {
    constructor(private useCase: AuthUseCase) { }


    async login(req: Request, res: Response) {
        const body = req.body;
        const user: Partial<UserModel> = {
            email: body.email,
            password: body.password
        }
        const result = await this.useCase.login(user);
        if(result) res.json(result);
        res.status(401).send('USER NOT FOUND')
    }
    async getNewAccessToken(req: Request, res: Response) {
        const user: Partial<UserModel> = req.params;
        const result:Result<TokensModel> = await this.useCase.getNewAccessToken(user);
        if(result) return res.json(result);
        return res.status(404).send('User not found');

    }


}