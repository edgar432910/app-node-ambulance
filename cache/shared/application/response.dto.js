"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseDto = void 0;
class ResponseDto {
    static format(trace, data, total = null) {
        if (total || total == 0) {
            return {
                trace,
                payload: {
                    data,
                    total
                }
            };
        }
        return { trace, payload: { data } };
    }
}
exports.ResponseDto = ResponseDto;
