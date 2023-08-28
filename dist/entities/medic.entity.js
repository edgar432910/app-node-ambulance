"use strict";var __decorate=this&&this.__decorate||function(e,t,o,r){var a,i=arguments.length,d=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)d=Reflect.decorate(e,t,o,r);else for(var _=e.length-1;_>=0;_--)(a=e[_])&&(d=(i<3?a(d):i>3?a(t,o,d):a(t,o))||d);return i>3&&d&&Object.defineProperty(t,o,d),d},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Medic=void 0;const typeorm_1=require("typeorm"),base_personal_1=__importDefault(require("./base-personal"));let Medic=class extends base_personal_1.default{};__decorate([(0,typeorm_1.PrimaryGeneratedColumn)(),__metadata("design:type",Number)],Medic.prototype,"id",void 0),__decorate([(0,typeorm_1.Column)({type:"varchar",length:10}),__metadata("design:type",String)],Medic.prototype,"cmp",void 0),__decorate([(0,typeorm_1.Column)({type:"varchar",length:20}),__metadata("design:type",String)],Medic.prototype,"document",void 0),__decorate([(0,typeorm_1.Column)({type:"int"}),__metadata("design:type",Number)],Medic.prototype,"typeDocument",void 0),Medic=__decorate([(0,typeorm_1.Entity)({name:"medic"})],Medic),exports.Medic=Medic;