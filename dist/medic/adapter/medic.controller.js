"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class MedicController{constructor(e,a){this.useCase=e,this.cache=a}async list(e,a){const s=await this.useCase.list({},[],{paternal_surname:"ASC",maternal_surname:"ASC",name:"ASC"});this.cache.set(a.locals.cacheKey,JSON.stringify(s)),a.json(s)}async getOne(e,a){const s={id:+e.params.id},t=await this.useCase.getOne(s);a.json(t)}async getPage(e,a){const s=+e.params.page,t=await this.useCase.getPage(s,{},[],{paternal_surname:"ASC",maternal_surname:"ASC",name:"ASC"});a.json(t)}async insert(e,a){const s=e.body,t={name:s.name,paternal_surname:s.paternal_surname,maternal_surname:s.maternal_surname,cmp:s.cmp,document:s.document,typeDocument:s.typeDocument},n=await this.useCase.insert(t);await this.cache.clear("MEDIC"),a.json(n)}async update(e,a){const s=e.body,t={id:+e.params.id},n=await this.useCase.update(s,t);a.json(n)}async delete(e,a){const s={id:+e.params.id},t=await this.useCase.delete(s);a.json(t)}async getUniqueMedic(e,a){const s=await this.useCase.getUniqueMedic();a.json(s)}async getReportMedic(e,a){const s=await this.useCase.getReportMedic();a.json(s)}}exports.default=MedicController;