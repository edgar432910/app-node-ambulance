"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    constructor(useCase) {
        this.useCase = useCase;
    }
    async login(req, res) {
        const body = req.body;
        const user = {
            email: body.email,
            password: body.password
        };
        const result = await this.useCase.login(user);
        if (result) {
            res.json(result);
        }
        else {
            res.status(401).send('USER NOT FOUND');
        }
    }
    async getNewAccessToken(req, res) {
        const { refreshToken } = req.params;
        const result = await this.useCase.getNewAccessToken(refreshToken);
        if (result)
            return res.json(result);
        return res.status(404).send('User not found');
    }
}
exports.default = AuthController;
