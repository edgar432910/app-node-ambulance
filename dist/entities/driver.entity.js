"use strict";var __decorate=this&&this.__decorate||function(e,t,r,o){var a,i=arguments.length,_=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)_=Reflect.decorate(e,t,r,o);else for(var n=e.length-1;n>=0;n--)(a=e[n])&&(_=(i<3?a(_):i>3?a(t,r,_):a(t,r))||_);return i>3&&_&&Object.defineProperty(t,r,_),_},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Driver=void 0;const typeorm_1=require("typeorm"),base_personal_1=__importDefault(require("./base-personal"));let Driver=class extends base_personal_1.default{};__decorate([(0,typeorm_1.PrimaryGeneratedColumn)(),__metadata("design:type",Number)],Driver.prototype,"id",void 0),Driver=__decorate([(0,typeorm_1.Entity)({name:"driver"})],Driver),exports.Driver=Driver;