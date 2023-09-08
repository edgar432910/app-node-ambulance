import { v4 as uuidv4 } from 'uuid';
import * as bcryptjs from "bcryptjs";
import jwt from "jwt-simple";
import { getUnixTime, add } from "date-fns"
import { UserModel } from '../domain/user.model';
import yenv from 'yenv';
import { TOKEN_ERROR, TOKEN_ERROR_MESSAGE } from '../../shared/enum/token-error.enum';
import { ResponseValidateToken } from '../../shared/types/response-validate-token.type';
const env = yenv();




export class UserService {
    static generateRefreshToken(): string {
        return uuidv4()
    }
    static async cryptPassword(password: string): Promise<string> {
        // 
        return bcryptjs.hash(password, 10);
    }
    static async decryptPassword(password: string, passwordHash: string): Promise<boolean> {
        return bcryptjs.compare(password, passwordHash);
    }
    static generateAccessToken(user: UserModel): string {
        // manejar un tema de fechas 
        // ? se neceista la fecha
        const dateCreated = new Date();
        const dateExpired = add(dateCreated, { minutes: env.TOKEN.TIME_LIVE });
        const payload = {
            iat: getUnixTime(dateCreated),
            exp: getUnixTime(dateExpired),
            name: user.name,
            lastname: user.lastname,
            roles: user.roles
        }
        return jwt.encode(payload, env.TOKEN.SECRET_WORD);
    }
    static validateAccessToken(token: string): Promise<ResponseValidateToken> {
        //?no es inmediata, los servidores no calculan cuanto demoran
        return new Promise((resolve, reject) => {
            try {
                const payload = jwt.decode(token, env.TOKEN.SECRET_WORD);
                resolve(payload);

            } catch (error) {
                //? token expirado
                if (error.message.toLowerCase() === TOKEN_ERROR.TOKEN_EXPIRED) {
                    reject({ status: 409, message: TOKEN_ERROR_MESSAGE.TOKEN_EXPIRED })
                }
                else {
                    //? token alterad
                    reject({ status: 401, message: TOKEN_ERROR_MESSAGE.TOKEN_INVALID })
                }
            }


        })
    }
}