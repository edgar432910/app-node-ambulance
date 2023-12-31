import multer from "multer"
import multer_s3 from "multer-s3"
import yenv from "yenv"
import { IError } from "@shared/helpers/errors.helper"
import { NextFunction, Request, Response } from "express"
import { S3Client } from "@aws-sdk/client-s3"
import { UploadOptions } from "@shared/application/upload-builder"
import { ParamsDictionary } from "express-serve-static-core"
import { ParsedQs } from "qs"

const env = yenv();
export type OptionsUploadType = UploadOptions | any;

export interface IUploadImage{
    save(options:OptionsUploadType): any;
}
export interface IUploadMultiple{
    saveMultiple(options:OptionsUploadType): any;
}


export class FactoryAWS implements IUploadImage,IUploadMultiple {
    saveMultiple(options: OptionsUploadType) {
        return multer(
            {limits:{fileSize:options.maxFileSize},
             storage:multer_s3({
                s3: new S3Client({}),
                bucket: env.S3.bucketName,
                acl: options.isPublic ? "public-read":"",
                metadata(req,file,cb){
                    cb(null,{fiedName:file.fieldname})
                },
                key:(req:Request,file,cb)=>{
                    const mimeType = file.mimetype
                    const isFileAllowed = options.mimeTypesAllowed.includes(mimeType)
                    const fileSize = file.size;
                    if(fileSize > options.maxFileSize){
                        const error: IError = new Error("File too large");
                        error.status = 422;
                        return cb(error, null);
                    }
                    if(!isFileAllowed){
                        const error: IError = new Error("File type not allowed");
                        error.code = "LIMIT_FILE_TYPES";
                        error.status = 422;
                        return cb(error, null);
                        // return cb(new Error('File type not allowed'), null);
                    }
                    const partsFile = file.originalname.split('.') // name.extension
                    const newName = Date.now().toString()
                    const extension = partsFile[partsFile.length-1]
                    const newFileName = `${options.directory}/${newName}.${extension}`
                    req.body[options.fieldName] = newFileName;
                    cb(null, newFileName)
                },
            }),
             }).single(options.fieldName)
    }
    save(options: OptionsUploadType)  {
        return multer(
        {limits:{fileSize:options.maxFileSize},
         storage:multer_s3({
            s3: new S3Client({}),
            bucket: env.S3.bucketName,
            acl: options.isPublic ? "public-read":"",
            metadata(req,file,cb){
                cb(null,{fiedName:file.fieldname})
            },
            key:(req:Request,file,cb)=>{
                const mimeType = file.mimetype
                const isFileAllowed = options.mimeTypesAllowed.includes(mimeType)
                const fileSize = file.size;
                if(fileSize > options.maxFileSize){
                    const error: IError = new Error("File too large");
                    error.status = 422;
                    return cb(error, null);
                }
                if(!isFileAllowed){
                    const error: IError = new Error("File type not allowed");
                    error.code = "LIMIT_FILE_TYPES";
                    error.status = 422;
                    return cb(error, null);
                    // return cb(new Error('File type not allowed'), null);
                }
                const partsFile = file.originalname.split('.') // name.extension
                const newName = Date.now().toString()
                const extension = partsFile[partsFile.length-1]
                const newFileName = `${options.directory}/${newName}.${extension}`
                req.body[options.fieldName] = newFileName;
                cb(null, newFileName)
            },
        }),
         }).single(options.fieldName)
         //      // array(options.fieldnames)
    //      // fields(["photo", "cv"])
    }
    
}

export class FactoryGoogle implements IUploadImage {
    save(options: OptionsUploadType)  {
      return false;
    }
    
}
export class FactoryAzure implements IUploadImage {
    save(options: OptionsUploadType)  {
      return false;
    }
    
}