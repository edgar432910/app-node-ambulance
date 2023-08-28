"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryAzure = exports.FactoryGoogle = exports.FactoryAWS = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const yenv_1 = __importDefault(require("yenv"));
const client_s3_1 = require("@aws-sdk/client-s3");
const env = (0, yenv_1.default)();
class FactoryAWS {
    saveMultiple(options) {
        return (0, multer_1.default)({ limits: { fileSize: options.maxFileSize },
            storage: (0, multer_s3_1.default)({
                s3: new client_s3_1.S3Client({}),
                bucket: env.S3.bucketName,
                acl: options.isPublic ? "public-read" : "",
                metadata(req, file, cb) {
                    cb(null, { fiedName: file.fieldname });
                },
                key: (req, file, cb) => {
                    const mimeType = file.mimetype;
                    const isFileAllowed = options.mimeTypesAllowed.includes(mimeType);
                    const fileSize = file.size;
                    if (fileSize > options.maxFileSize) {
                        const error = new Error("File too large");
                        error.status = 422;
                        return cb(error, null);
                    }
                    if (!isFileAllowed) {
                        const error = new Error("File type not allowed");
                        error.code = "LIMIT_FILE_TYPES";
                        error.status = 422;
                        return cb(error, null);
                        // return cb(new Error('File type not allowed'), null);
                    }
                    const partsFile = file.originalname.split('.'); // name.extension
                    const newName = Date.now().toString();
                    const extension = partsFile[partsFile.length - 1];
                    const newFileName = `${options.directory}/${newName}.${extension}`;
                    req.body[options.fieldName] = newFileName;
                    cb(null, newFileName);
                },
            }),
        }).single(options.fieldName);
    }
    save(options) {
        return (0, multer_1.default)({ limits: { fileSize: options.maxFileSize },
            storage: (0, multer_s3_1.default)({
                s3: new client_s3_1.S3Client({}),
                bucket: env.S3.bucketName,
                acl: options.isPublic ? "public-read" : "",
                metadata(req, file, cb) {
                    cb(null, { fiedName: file.fieldname });
                },
                key: (req, file, cb) => {
                    const mimeType = file.mimetype;
                    const isFileAllowed = options.mimeTypesAllowed.includes(mimeType);
                    const fileSize = file.size;
                    if (fileSize > options.maxFileSize) {
                        const error = new Error("File too large");
                        error.status = 422;
                        return cb(error, null);
                    }
                    if (!isFileAllowed) {
                        const error = new Error("File type not allowed");
                        error.code = "LIMIT_FILE_TYPES";
                        error.status = 422;
                        return cb(error, null);
                        // return cb(new Error('File type not allowed'), null);
                    }
                    const partsFile = file.originalname.split('.'); // name.extension
                    const newName = Date.now().toString();
                    const extension = partsFile[partsFile.length - 1];
                    const newFileName = `${options.directory}/${newName}.${extension}`;
                    req.body[options.fieldName] = newFileName;
                    cb(null, newFileName);
                },
            }),
        }).single(options.fieldName);
        //      // array(options.fieldnames)
        //      // fields(["photo", "cv"])
    }
}
exports.FactoryAWS = FactoryAWS;
class FactoryGoogle {
    save(options) {
        return false;
    }
}
exports.FactoryGoogle = FactoryGoogle;
class FactoryAzure {
    save(options) {
        return false;
    }
}
exports.FactoryAzure = FactoryAzure;
