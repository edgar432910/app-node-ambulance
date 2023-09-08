"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseBootstrap = void 0;
const yenv_1 = __importDefault(require("yenv"));
const typeorm_1 = require("typeorm");
const env = (0, yenv_1.default)();
class DatabaseBootstrap {
    initialize() {
        const parametersConnection = {
            host: env.DATABASES.MYSQL.HOST,
            type: env.DATABASES.MYSQL.TYPE,
            username: env.DATABASES.MYSQL.USERNAME,
            password: env.DATABASES.MYSQL.PASSWORD,
            database: env.DATABASES.MYSQL.DATABASE,
            port: env.DATABASES.MYSQL.PORT,
            entities: env.DATABASES.MYSQL.ENTITIES,
            synchronize: env.DATABASES.MYSQL.SYNCHRONIZE,
            logging: env.DATABASES.MYSQL.LOGGIN,
        };
        const AppDataSource = new typeorm_1.DataSource({
            ...parametersConnection
        });
        DatabaseBootstrap.appDataSource = AppDataSource;
        return AppDataSource.initialize();
    }
    close() {
        DatabaseBootstrap.appDataSource?.destroy();
    }
    static get dataSource() {
        return DatabaseBootstrap.appDataSource;
    }
}
exports.DatabaseBootstrap = DatabaseBootstrap;
