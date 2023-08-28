"use strict";var __createBinding=this&&this.__createBinding||(Object.create?function(t,e,a,o){void 0===o&&(o=a);var r=Object.getOwnPropertyDescriptor(e,a);r&&!("get"in r?!e.__esModule:r.writable||r.configurable)||(r={enumerable:!0,get:function(){return e[a]}}),Object.defineProperty(t,o,r)}:function(t,e,a,o){void 0===o&&(o=a),t[o]=e[a]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(t,e){Object.defineProperty(t,"default",{enumerable:!0,value:e})}:function(t,e){t.default=e}),__importStar=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var a in t)"default"!==a&&Object.prototype.hasOwnProperty.call(t,a)&&__createBinding(e,t,a);return __setModuleDefault(e,t),e};Object.defineProperty(exports,"__esModule",{value:!0}),exports.BaseOperation=void 0;const database_boostrap_1=require("../../bootstrap/database.boostrap"),response_dto_1=require("../application/response.dto"),_=__importStar(require("lodash"));class BaseOperation{constructor(t){this.entity=t}async list(t={},e=[],a={}){const o=database_boostrap_1.DatabaseBootstrap.dataSource.getRepository(this.entity),r=await o.find({where:t,relations:e,order:a});return response_dto_1.ResponseDto.format("",r)}async getOne(t={},e=[]){const a=database_boostrap_1.DatabaseBootstrap.dataSource.getRepository(this.entity),o=await a.findOne({where:t,relations:e});return response_dto_1.ResponseDto.format("",o)}async getPage(t,e,a={},o=[],r={}){const s=database_boostrap_1.DatabaseBootstrap.dataSource.getRepository(this.entity),[n,i]=await s.findAndCount({where:a,relations:o,order:r,skip:t*e,take:e});return response_dto_1.ResponseDto.format("",n,i)}async insert(t){const e=database_boostrap_1.DatabaseBootstrap.dataSource.getRepository(this.entity),a=e.create(t),o=await e.save(a);return response_dto_1.ResponseDto.format("",o)}async update(t,e={},a=[]){const o=database_boostrap_1.DatabaseBootstrap.dataSource.getRepository(this.entity);let r=await o.find({where:e,relations:a});return r=r.map((e=>_.merge(e,t))),await o.save(r),response_dto_1.ResponseDto.format("",r)}async delete(t){throw new Error("not implemented")}}exports.BaseOperation=BaseOperation;