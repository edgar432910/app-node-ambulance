"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListDto = void 0;
const yenv_1 = __importDefault(require("yenv"));
const env = (0, yenv_1.default)();
class UserListDto {
    static mapping(result) {
        let data = result.payload.data;
        data = data.map((el) => ({
            ...el,
            photo: `${env.S3.bucketPath}/${el.photo}`
        }));
        result.payload.data = data;
        return result;
    }
}
exports.UserListDto = UserListDto;
