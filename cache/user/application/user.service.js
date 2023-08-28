"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const uuid_1 = require("uuid");
const bcryptjs = __importStar(require("bcryptjs"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const date_fns_1 = require("date-fns");
const yenv_1 = __importDefault(require("yenv"));
const token_error_enum_1 = require("@shared/enum/token-error.enum");
const env = (0, yenv_1.default)();
class UserService {
    static generateRefreshToken() {
        return (0, uuid_1.v4)();
    }
    static async cryptPassword(password) {
        // 
        return bcryptjs.hash(password, 10);
    }
    static async decryptPassword(password, passwordHash) {
        return bcryptjs.compare(password, passwordHash);
    }
    static generateAccessToken(user) {
        // manejar un tema de fechas 
        // ? se neceista la fecha
        const dateCreated = new Date();
        const dateExpired = (0, date_fns_1.add)(dateCreated, { minutes: env.TOKEN.TIME_LIVE });
        const payload = {
            iat: (0, date_fns_1.getUnixTime)(dateCreated),
            exp: (0, date_fns_1.getUnixTime)(dateExpired),
            name: user.name,
            lastname: user.lastname,
            roles: user.roles
        };
        return jwt_simple_1.default.encode(payload, env.TOKEN.SECRET_WORD);
    }
    static validateAccessToken(token) {
        //?no es inmediata, los servidores no calculan cuanto demoran
        return new Promise((resolve, reject) => {
            try {
                const payload = jwt_simple_1.default.decode(token, env.TOKEN.SECRET_WORD);
                resolve(payload);
            }
            catch (error) {
                //? token expirado
                if (error.message.toLowerCase() === token_error_enum_1.TOKEN_ERROR.TOKEN_EXPIRED) {
                    reject({ status: 409, message: token_error_enum_1.TOKEN_ERROR_MESSAGE.TOKEN_EXPIRED });
                }
                else {
                    //? token alterad
                    reject({ status: 401, message: token_error_enum_1.TOKEN_ERROR_MESSAGE.TOKEN_INVALID });
                }
            }
        });
    }
}
exports.UserService = UserService;
