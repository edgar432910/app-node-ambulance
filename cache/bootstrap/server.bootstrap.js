"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const yenv_1 = __importDefault(require("yenv"));
const env = (0, yenv_1.default)();
class ServerBootstrap {
    constructor(app) {
        this.app = app;
    }
    initialize() {
        return new Promise((resolve, reject) => {
            const server = http_1.default.createServer(this.app);
            server
                .listen(env.PORT)
                .on("listening", () => {
                console.log(`SERVER IS LISTENING ON PORT ${env.PORT}`);
                resolve("Server is ok");
            })
                .on("error", (error) => {
                console.log(`An error`);
                reject(error);
                console.log('Server error', error);
                process.exit(1);
            });
        });
    }
    close() {
        process.exit(1);
    }
}
exports.default = ServerBootstrap;
