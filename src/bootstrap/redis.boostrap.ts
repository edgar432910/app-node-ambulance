import IBootstrap from "./bootstrap.interface";
import yenv from "yenv";
import IORedis from 'ioredis';
import logger from "../shared/helpers/logging.helper";

const env = yenv();
let client: any;


export default class RedisBootstrap implements IBootstrap {

    private client: IORedis;

    initialize(): Promise<unknown> {
        return new Promise((resolve, reject) => {
            const connectionParams = {
                host: env.DATABASES.REDIS.HOST,
                port: env.DATABASES.REDIS.PORT,
                password: '' + env.DATABASES.REDIS.PASS,
                maxRetriesPerRequest: 5,
            };
            this.client = new IORedis(connectionParams);
            this.client.on("connect", () => {
                logger.info("Connected to Redis");
                resolve(true)
            }).on("error", (error) => {
                reject(error)
            })

            client = this.client;
        })
    }

    close(): void {
        if (!client) return;
        client.disconnect();
    }
    getConnection() {
        return this.client;
    }
    static async get(Key: string) {
        return await client.get(Key);
    }
    static async set(key: string, value: any) {
        if(client) await client.set(key, value, "PX", 24 * 60 * 60 * 1000);
    }
    static async clear(prefix: string = "") {
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