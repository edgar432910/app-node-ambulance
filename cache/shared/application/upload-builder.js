"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadOptions = exports.UploadBuilder = void 0;
class UploadBuilder {
    get fieldName() {
        return this._fieldName;
    }
    get maxFileSize() {
        return this._maxFileSize;
    }
    get directory() {
        return this._directory;
    }
    get isPublic() {
        return this._isPublic;
    }
    get mimeTypesAllowed() {
        return this._mimeTypesAllowed;
    }
    addFieldName(fieldName) {
        this._fieldName = fieldName;
        return this;
    }
    addMaxFileSize(maxFileSize) {
        this._maxFileSize = maxFileSize;
        return this;
    }
    addDirectory(directory) {
        this._directory = directory;
        return this;
    }
    addIsPublic(isPublic) {
        this._isPublic = isPublic;
        return this;
    }
    addMimeTypesAllowed(mimeTypesAllowed) {
        this._mimeTypesAllowed = mimeTypesAllowed;
        return this;
    }
    build() {
        return new UploadOptions(this);
    }
}
exports.UploadBuilder = UploadBuilder;
class UploadOptions {
    constructor(ub) {
        this.fieldName = ub.fieldName;
        this.maxFileSize = ub.maxFileSize;
        this.directory = ub.directory;
        this.isPublic = ub.isPublic;
        this.mimeTypesAllowed = ub.mimeTypesAllowed;
    }
}
exports.UploadOptions = UploadOptions;
