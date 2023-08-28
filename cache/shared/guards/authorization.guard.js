"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationGuard = void 0;
class AuthorizationGuard {
    static canActivate(...actionsAllowed) {
        return (req, res, next) => {
            const { roles } = res.locals.payload;
            const listActions = roles.map((role) => role.actions)
                .reduce((accumm, actions) => {
                accumm += actions; //? accum = [], acum = []
                return accumm;
            }, '')
                .split(',');
            const listActionUnique = [...new Set(listActions)];
            //? buscar las acciones
            let actionMatched = false;
            const matched = actionsAllowed.some((action) => listActionUnique.includes(action));
            if (matched)
                next();
            else {
                res.status(403).send("Forbidden");
            }
            // for(const action of actionsAllowed) {
            //     if(listActionUnique.includes(action)) {
            //         actionMatched = true;
            //         break;
            //     }
            // }
        };
    }
}
exports.AuthorizationGuard = AuthorizationGuard;
