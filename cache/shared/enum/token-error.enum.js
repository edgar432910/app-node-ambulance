"use strict";
//? crear enumeraciones
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_ERROR_MESSAGE = exports.TOKEN_ERROR = void 0;
var TOKEN_ERROR;
(function (TOKEN_ERROR) {
    TOKEN_ERROR["TOKEN_INVALID"] = "token invalid";
    TOKEN_ERROR["TOKEN_EXPIRED"] = "token expired";
})(TOKEN_ERROR = exports.TOKEN_ERROR || (exports.TOKEN_ERROR = {}));
var TOKEN_ERROR_MESSAGE;
(function (TOKEN_ERROR_MESSAGE) {
    TOKEN_ERROR_MESSAGE["TOKEN_INVALID"] = "El token es invalido";
    TOKEN_ERROR_MESSAGE["TOKEN_EXPIRED"] = "El token ha expirado";
})(TOKEN_ERROR_MESSAGE = exports.TOKEN_ERROR_MESSAGE || (exports.TOKEN_ERROR_MESSAGE = {}));
