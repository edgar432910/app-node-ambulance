import IBootstrap from "./bootstrap.interface";
import yenv from "yenv";
import { DataSource } from 'typeorm';
const env = yenv();

export class DatabaseBootstrap implements IBootstrap {
    private static appDataSource: DataSource;

    initialize(): Promise<any> {
        return new Promise((resolve, reject) => {
            const parametersConnection = {
                host: env.DATABASES.MYSQL.HOST,
                type: env.DATABASES.MYSQL.TYPE,
                username: env.DATABASES.MYSQL.USERNAME,
                password: env.DATABASES.MYSQL.PASSWORD,
                database: env.DATABASES.MYSQL.DATABASE,
                port: env.DATABASES.MYSQL.PORT,
                entities: [env.DATABASES.MYSQL.ENTITIES],
                synchronize: env.DATABASES.MYSQL.SYNCHRONIZE,
                logging: env.DATABASES.MYSQL.LOGGIN,
            }
            const AppDataSource = new DataSource({
                ...parametersConnection
            })
            DatabaseBootstrap.appDataSource = AppDataSource;
            return AppDataSource.initialize();

        })
    }
    close(): void {
        DatabaseBootstrap.appDataSource?.destroy();
    }
    static get dataSource(): DataSource {
        return DatabaseBootstrap.appDataSource;
    }
}