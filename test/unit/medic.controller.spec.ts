import * as httpMock from "node-mocks-http"
import { MockMedicUseCase } from "./repositories/mockMedicUseCase";
let req:any, res:any, next;
let mockMedicUseCase:any;
let medicController:any;
const listMedics =[
    {name:"John", paternal_surname:"Doe", maternal_surname:"Doe", cmp:"121321212", document:"121321212", typeDocument:2}
]
const resultMedicByPage = {
    trace: "f28c7bca-4ba4-11ee-be56-0242ac120002",
    payload: {
        data: listMedics,
        total: 1
    }
}

describe("medic.controller",()=>{
    beforeEach(()=>{
        req = httpMock.createRequest();
        res = httpMock.createResponse();
        next = null;
        mockMedicUseCase = new MockMedicUseCase()
        medicController = mockMedicUseCase.getController();
    })
    it("list", async()=>{
    // Preparacion 
    // mockMedicUseCase.getMock();
    // const mockCache: ICache = {
    //     set(key:string, value:string){},
    //     clear(key:string){
    //         return Promise.resolve();
    //     }
    // }
    // const medicUseCase = new MedicUseCase({} as MedicRepository);
    // const medicController = new MedicController(medicUseCase, mockMedicUseCase.getCache())
    // ejecucion 
     await medicController.list(req, res)
    mockMedicUseCase.assertMockList(res);

    });
    it("getOne", async()=>{
    // Preparacion 
    // mockMedicUseCase.getMock();

    // const mockCache: ICache = {
    //     set(key:string, value:string){},
    //     clear(key:string){
    //         return Promise.resolve();
    //     }
    // }
    // const medicUseCase = new MedicUseCase({} as MedicRepository);
    // const medicController = new MedicController(medicUseCase, mockMedicUseCase.getCache())
    // ejecucion 
     await medicController.getOne(req, res)
     mockMedicUseCase.assertMockGetOne(res)
    //  const result  = res._getJSONData();
     
    // // Expectativas o comprobacion 
    // // console.log({res})
    // // console.log({result})
    // expect(res.statusCode).toEqual(200);
    // expect(result).toEqual(listMedics[0]);

    });

    it("getPage", async()=>{
        // Preparacion 
        // mockMedicUseCase.getMock();

        // const mockCache: ICache = {
        //     set(key:string, value:string){},
        //     clear(key:string){
        //         return Promise.resolve();
        //     }
        // }
        // const medicUseCase = new MedicUseCase({} as MedicRepository);
        // const medicController = new MedicController(medicUseCase, mockMedicUseCase.getCache())
        // ejecucion 
         await medicController.getPage(req, res)
        mockMedicUseCase.assertMockGetPage(res)

        //  const result  = res._getJSONData();
         
        // Expectativas o comprobacion 
        // console.log({res})
        // console.log({result})
        // expect(res.statusCode).toEqual(200);
        // expect(result).toEqual(resultMedicByPage);
    
        });
    it("insert", async()=>{
        // Preparacion 
        // mockMedicUseCase.getMock();
    
        // const mockCache: ICache = {
        //     set(key:string, value:string){},
        //     clear(key:string){
        //         return Promise.resolve();
        //     }
        // }
        // const medicUseCase = new MedicUseCase({} as MedicRepository);
        // const medicController = new MedicController(medicUseCase, mockMedicUseCase.getCache())
        // ejecucion 
         await medicController.insert(req, res)
        mockMedicUseCase.assertMockInsert(res)

        //  const result  = res._getJSONData();
         
        // // Expectativas o comprobacion 
        // // console.log({res})
        // // console.log({result})
        // expect(res.statusCode).toEqual(200);
        // expect(result).toEqual(listMedics[0]);
    
        });
    it("update", async()=>{
        // Preparacion 
        //  mockMedicUseCase.getMock();
        //  const medicController = mockMedicUseCase.getController();

        // ejecucion 
         await medicController.update(req, res)
        mockMedicUseCase.assertMockUpdate(res)
    
        });
    it("delete", async()=>{
        // Preparacion 
        // mockMedicUseCase.getMock();
    
        // ejecucion 
        // const medicController = mockMedicUseCase.getController();
         await medicController.delete(req, res)
         // comporbacion
        mockMedicUseCase.assertMockDelete(res)
    
        });
})