import multer from "multer"
import multer_s3 from "multer-s3"
import yenv from "yenv"
import { IError } from "@shared/helpers/errors.helper"
import { Request } from "express"
import { S3Client } from "@aws-sdk/client-s3"

const env = yenv()
export class UploadMiddleware{
    static S3(
        fieldName:string, 
        maxFileSize:number=2000000,
        directory:string = '',
        ispublic:boolean = false, 
        ...mimeTypesAllowed:string[]){
        console.log("upload");
        console.log({fieldName});
        return multer(
        {limits:{fileSize:maxFileSize},
         storage:multer_s3({
            s3: new S3Client({}),
            bucket: env.S3.bucketName,
            acl: ispublic ? "public-read":"",
            metadata(req,file,cb){
                cb(null,{fiedName:file.fieldname})
            },
            key:(req:Request,file,cb)=>{
                const mimeType = file.mimetype
                const isFileAllowed = mimeTypesAllowed.includes(mimeType)
                if(!isFileAllowed){
                    const error: IError = new Error("File type not allowed");
                    // error.status = 422;
                    return cb(error, null);
                    // return cb(new Error('File type not allowed'), null);
                }
                const partsFile = file.originalname.split('.') // name.extension
                const newName = Date.now().toString()
                const extension = partsFile[partsFile.length-1]
                const newFileName = `${directory}/${newName}.${extension}`
                req.body[fieldName] = newFileName;
                cb(null, newFileName)
            },
        }),
         }).single(fieldName)
    }
}