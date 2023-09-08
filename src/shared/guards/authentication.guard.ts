import { ErrorResponse } from "../interfaces/error-response.interface";
import { IPayload } from "../interfaces/payload.interface";
import { UserService } from "../../user/application/user.service";
import { NextFunction, Request, Response } from "express";
import { IError } from "@shared/helpers/errors.helper";


export class AuthenticationGuard {
    static canActivate(req: Request, res: Response, next: NextFunction) {
        // return res.status(401).send('Unauthorized')
        const headers = req.headers;
        const authorizationHeader = headers["authorization"];
        if (!authorizationHeader) {
            const error:IError = new Error("Unauthorized");
            error.status = 401;
            next(error)
            // return res.status(401).send('Unauthorized');
        }
        // ? asegurar que tenga la estructura
        const parts = authorizationHeader.split(" ");
        //? evaluo que tenga bearer
        if (!(parts.length > 1 && parts[0].toLocaleLowerCase() == "bearer")) {
            // return res.status(401).send('Unauthorized');
            const error:IError = new Error("Unauthorized");
            error.status = 401;
            next(error)
        }
        //? validar el access token
        UserService.validateAccessToken(parts[1]).then(
            (payload: IPayload) => {
                //? esta authenticado pero que roles
                res.locals.payload = payload;
                next();
            }, (error: ErrorResponse) => {
               
                next(error)
                // return res.status(error.status).send(error.message);
            })


    }
}