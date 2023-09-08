import MedicController from "../../../src/medic/adapter/medic.controller";
import MedicRepository from "../../../src/medic/application/medic.repository";
import MedicUseCase from "../../../src/medic/application/medic.usecase";
import mockMedic from "../mocks/medic.json"
import mockMedicResult from "../mocks/medic-result.json"
export class MockMedicUseCase{
    private listMedics =[
        mockMedic
    ]
    private resultMedicByPage = mockMedicResult
    getController(){

        const medicUseCase = new MedicUseCase({} as MedicRepository);
        return new MedicController(medicUseCase, this.getCache())
         
    }
    getCache(){
       return {
            set(key:string, value:string){},
            clear(key:string){
                return Promise.resolve();
            }
        }
    }
    constructor(){
    ( MedicUseCase as jest.Mock) = jest.fn().mockReturnValue({
        list: jest.fn().mockResolvedValue(this.listMedics),
        getOne: jest.fn().mockResolvedValue(this.listMedics[0]),
        getPage: jest.fn().mockResolvedValue(this.resultMedicByPage),
        insert: jest.fn().mockResolvedValue(this.listMedics[0]),
        update: jest.fn().mockResolvedValue(this.listMedics[0]),
        delete: jest.fn().mockResolvedValue(this.listMedics[0])
       });
    }
    assertMockList(res:any){
        const result  = res._getJSONData();
        expect(res.statusCode).toBe(200);
        expect(result).toEqual(this.listMedics);

    }
    assertMockGetOne(res:any){
        const result  = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(result).toEqual(this.listMedics[0]);

    }
    assertMockGetPage(res:any){
        const result  = res._getJSONData();
         
        // Expectativas o comprobacion 
        // console.log({res})
        // console.log({result})
        expect(res.statusCode).toEqual(200);
        expect(result).toEqual(this.resultMedicByPage);

    }
    assertMockInsert(res:any){
        const result  = res._getJSONData();
        expect(res.statusCode).toEqual(200);
        expect(result).toEqual(this.listMedics[0]);

    }
    assertMockUpdate(res:any){
        const result  = res._getJSONData();
         
        // Expectativas o comprobacion 
        // console.log({res})
        // console.log({result})
        expect(res.statusCode).toEqual(200);
        expect(result).toEqual(this.listMedics[0]);

    }
    assertMockDelete(res:any){
        const result  = res._getJSONData();
         
        // Expectativas o comprobacion 
        // console.log({res})
        // console.log({result})
        expect(res.statusCode).toBe(200);
        expect(result).toEqual(this.listMedics[0]);

    }
}