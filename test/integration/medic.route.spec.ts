// obtener la lista de los medicos sin usar token

import app from "../../src/app"
import { DatabaseBootstrap } from "../../src/bootstrap/database.boostrap"
import RedisBootstrap from "../../src/bootstrap/redis.boostrap"

import request from "supertest"
const tokenValid = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTQxNDYwNDgsImV4cCI6MjI5NDE0NjA0OCwibmFtZSI6IkVkZ2FyIiwibGFzdG5hbWUiOiJSb2RyaWd1ZXoiLCJyb2xlcyI6W3siZGF0ZUNyZWF0ZWQiOiIyMDIzLTA4LTE3VDIzOjM2OjUyLjAwMFoiLCJkYXRlVXBkYXRlZCI6IjIwMjMtMDgtMTdUMjM6MzY6NTIuMDAwWiIsImFjdGl2ZSI6dHJ1ZSwiaWQiOjEsIm5hbWUiOiJNRURJQyIsImFjdGlvbnMiOiJMSVNUX1VTRVIsR0VUX01FRElDLElOU0VSVF9NRURJQyxVUERBVEVfTUVESUMsREVMRVRFX01FRElDIn1dfQ.LqcvSsaceXWaRjIa4me-5rkmMsvzIls3MbGxP7rlouA'
const tokenInvalid = 'EyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTQxNDYwNDgsImV4cCI6MjI5NDE0NjA0OCwibmFtZSI6IkVkZ2FyIiwibGFzdG5hbWUiOiJSb2RyaWd1ZXoiLCJyb2xlcyI6W3siZGF0ZUNyZWF0ZWQiOiIyMDIzLTA4LTE3VDIzOjM2OjUyLjAwMFoiLCJkYXRlVXBkYXRlZCI6IjIwMjMtMDgtMTdUMjM6MzY6NTIuMDAwWiIsImFjdGl2ZSI6dHJ1ZSwiaWQiOjEsIm5hbWUiOiJNRURJQyIsImFjdGlvbnMiOiJMSVNUX1VTRVIsR0VUX01FRElDLElOU0VSVF9NRURJQyxVUERBVEVfTUVESUMsREVMRVRFX01FRElDIn1dfQ.LqcvSsaceXWaRjIa4me-5rkmMsvzIls3MbGxP7rlouA'
const TIMEOUT = 24*60*60*1000;
const dataBaseBootstrap = new DatabaseBootstrap();
const redisBootstrap = new RedisBootstrap();
describe('Medic.rout',()=>{
    beforeAll(async()=>{
        await dataBaseBootstrap.initialize();
        await redisBootstrap.initialize();
    })
    afterAll(async()=>{
        await dataBaseBootstrap.close();
        await redisBootstrap.close();

    })
    it('get /medics without token', async()=>{
        // preparacion
        const rq = request(app)

        // ejecucion 
        const response = await rq.get('/medics')
        // comprobacion
        expect(response.status).toBe(401)
        expect(response.body.message).toBe('Unauthorized');
    }, TIMEOUT)
    it('get /medics with token', async()=>{
        // preparacion
        const rq = request(app)

        // ejecucion 
        const response = await rq.get('/medics').set("Authorization",`Bearer ${tokenValid}`)
        // comprobacion

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('trace');
        expect(response.body).toHaveProperty('payload');
        expect(response.body).toHaveProperty('payload.data');
    })
    it('get /medics with token invalid', async()=>{
        // preparacion
        const rq = request(app)

        // ejecucion 
        const response = await rq.get('/medics').set("Authorization",`Bearer ${tokenInvalid}`)

        // comprobacion
        expect(response.status).toBe(401)
        expect(response.body.message).toBe('El token es invalido');
    },TIMEOUT)
})