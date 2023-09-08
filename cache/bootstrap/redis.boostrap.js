"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yenv_1 = __importDefault(require("yenv"));
const ioredis_1 = __importDefault(require("ioredis"));
const env = (0, yenv_1.default)();
let client;
class RedisBootstrap {
    initialize() {
        return new Promise((resolve, reject) => {
            const connectionParams = {
                host: env.DATABASES.REDIS.HOST,
                port: env.DATABASES.REDIS.PORT,
                password: '' + env.DATABASES.REDIS.PASS,
                maxRetriesPerRequest: 5,
            };
            this.client = new ioredis_1.default(connectionParams);
            this.client.on("connect", () => {
                console.log("Connected to Redis");
                resolve(true);
            }).on("error", (error) => {
                reject(error);
            });
            client = this.client;
        });
    }
    close() {
        if (!client)
            return;
        client.disconnect();
    }
    getConnection() {
        return this.client;
    }
    static async get(Key) {
        return await client.get(Key);
    }
    static async set(key, value) {
        if (client)
            await client.set(key, value, "PX", 24 * 60 * 60 * 1000);
    }
    static async clear(prefix = "") {
        // const keys = await client.keys(`${prefix}*`);
        // const pipelines = client.pipelines();
        // keys.forEach((key: string) => {
        //     pipelines.del(key)
        // })
        // return pipelines.exec()
        const keys = await client.keys(`${prefix}*`);
        if (keys.length > 0) {
            await client.del(keys);
        }
    }
}
exports.default = RedisBootstrap;
