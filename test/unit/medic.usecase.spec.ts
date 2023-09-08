import { MockMedicOperation } from "./repositories/mockMedicOperation";

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
let mockMedicOperation:any, medicUseCase:any;

describe("medic.controller",()=>{
    beforeEach(()=>{
        mockMedicOperation = new MockMedicOperation();
        console.log({mockMedicOperation})
        medicUseCase = mockMedicOperation.getUseCase();
    })
    it("list", async()=>{
        const response = await medicUseCase.list()
        mockMedicOperation.assertMockList(response);
    
        });
})