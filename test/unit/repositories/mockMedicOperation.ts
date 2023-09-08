import mockMedic from "../mocks/medic.json"
import mockMedicResult from "../mocks/medic-result.json"
import MedicOperation from "../../../src/medic/infraestructure/medic.operation"
import MedicUseCase from "../../../src/medic/application/medic.usecase"
import { MedicModel } from "../../../src/medic/domain/medic.model"
import Result from "../../../src/shared/application/result.interface"
export class MockMedicOperation {
    private listMedics =[
        mockMedic
    ]
    private resultMedicByPage = mockMedicResult;
    private medicOperation:any;
    constructor(){
        ( (MedicOperation as unknown) as jest.Mock) = jest.fn().mockReturnValue({
            list: jest.fn().mockResolvedValue(mockMedicResult),
            getOne: jest.fn().mockResolvedValue(this.listMedics[0]),
            getPage: jest.fn().mockResolvedValue(this.resultMedicByPage),
            insert: jest.fn().mockResolvedValue(this.listMedics[0]),
            update: jest.fn().mockResolvedValue(this.listMedics[0]),
            delete: jest.fn().mockResolvedValue(this.listMedics[0])
           });
    }

    getUseCase(){
        this.medicOperation = new MedicOperation()
        return new MedicUseCase(this.medicOperation);
    }
    
    assertMockList(response:Result<MedicModel>){
       expect(response).toHaveProperty("trace")
       expect(response).toHaveProperty("payload")
       expect(response).toHaveProperty("payload.data")
       expect(response.payload.data).not.toBeNull();
       expect(Array.isArray(response.payload.data)).toBeTruthy();
       expect(this.medicOperation.list).toHaveBeenCalled();
       expect(this.medicOperation.list).toHaveBeenCalledTimes(1);


    }
}