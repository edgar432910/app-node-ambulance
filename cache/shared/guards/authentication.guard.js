"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationGuard = void 0;
const user_service_1 = require("@user/application/user.service");
class AuthenticationGuard {
    static canActivate(req, res, next) {
        // return res.status(401).send('Unauthorized')
        const headers = req.headers;
        const authorizationHeader = headers["authorization"];
        if (!authorizationHeader)
            return res.status(401).send('Unauthorized');
        // ? asegurar que tenga la estructura
        const parts = authorizationHeader.split(" ");
        //? evaluo que tenga bearer
        if (!(parts.length > 1 && parts[0].toLocaleLowerCase() == "bearer"))
            return res.status(401).send('Unauthorized');
        //? validar el access token
        user_service_1.UserService.validateAccessToken(parts[1]).then((payload) => {
            //? esta authenticado pero que roles
            res.locals.payload = payload;
            next();
        }, (error) => {
            return res.status(error.status).send(error.message);
        });
    }
}
exports.AuthenticationGuard = AuthenticationGuard;
