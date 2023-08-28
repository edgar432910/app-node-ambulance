"use strict";var __decorate=this&&this.__decorate||function(e,t,o,r){var a,_=arguments.length,n=_<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,o,r);else for(var i=e.length-1;i>=0;i--)(a=e[i])&&(n=(_<3?a(n):_>3?a(t,o,n):a(t,o))||n);return _>3&&n&&Object.defineProperty(t,o,n),n},__metadata=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Role=void 0;const typeorm_1=require("typeorm"),base_1=__importDefault(require("./base")),user_entity_1=require("./user.entity");let Role=class extends base_1.default{};__decorate([(0,typeorm_1.PrimaryGeneratedColumn)(),__metadata("design:type",Number)],Role.prototype,"id",void 0),__decorate([(0,typeorm_1.Column)({type:"varchar",length:50}),__metadata("design:type",String)],Role.prototype,"name",void 0),__decorate([(0,typeorm_1.Column)({type:"varchar",length:1e3}),__metadata("design:type",String)],Role.prototype,"actions",void 0),__decorate([(0,typeorm_1.ManyToMany)((e=>user_entity_1.User),(e=>e.roles)),__metadata("design:type",Array)],Role.prototype,"users",void 0),Role=__decorate([(0,typeorm_1.Entity)({name:"role"})],Role),exports.Role=Role;