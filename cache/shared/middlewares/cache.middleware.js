"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_boostrap_1 = __importDefault(require("@bootstrap/redis.boostrap"));
class CacheRedis {
    static handle(prefix) {
        return async (req, res, next) => {
            let key = prefix;
            if (req.params) {
                for (const prop in req.params) {
                    key += `_${req.params[prop]}`;
                }
            }
            if (req.query) {
                for (const prop in req.query) {
                    key += `_${req.query[prop]}`;
                }
            }
            if (req.body) {
                for (const prop in req.body) {
                    key += `_${req.body[prop]}`;
                }
            }
            const result = await redis_boostrap_1.default.get(key);
            if (result) {
                console.log('Ejecucion desde redis');
                res.json(JSON.parse(result));
            }
            else {
                res.locals.cacheKey = key;
                next();
            }
        };
    }
}
exports.default = CacheRedis;
