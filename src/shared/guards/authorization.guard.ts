import { NextFunction, Request, Response } from "express";

export class AuthorizationGuard {
    static canActivate(...actionsAllowed: string[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            const { roles } = res.locals.payload;
            const listActions: string[] = roles.map((role: any) => role.actions)
                .reduce((accumm: any, actions: string) => { //? [{actions:USER_LIST"}, {actions: "MEDICS_LIST"}]
                    accumm += actions //? accum = [], acum = []
                    return accumm;
                }, '')
                .split(',')

            const listActionUnique = [...new Set(listActions)];
            //? buscar las acciones
            let actionMatched = false;
            const matched = actionsAllowed.some((action) => listActionUnique.includes(action));
            if(matched) next();
            else{
                res.status(403).send("Forbidden")
            }
            // for(const action of actionsAllowed) {
            //     if(listActionUnique.includes(action)) {
            //         actionMatched = true;
            //         break;
            //     }
            // }
        }
    }
}