
export interface IUpload{
    fieldName: string;
    maxFileSize: number;
    directory: string;
    isPublic: boolean;
    mimeTypeAllowed: string[];
}