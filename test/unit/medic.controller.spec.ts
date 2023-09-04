// import MedicController from "../../src/medic/adapter/medic.controller"
// import MedicRepository from "../../src/medic/application/medic.repository";
// import MedicUseCase from "../../src/medic/application/medic.usecase"
// const listMedics =[
//     {name:"John", paternal_surname:"Doe", maternal_surname:"Doe", cmp:"121321212", document:"121321212", typeDocument:2}
// ]

// describe("medic.controller",()=>{
//     // Preparacion
//     it("list", async()=>{
//        ( MedicUseCase as jest.Mock) = jest.fn().mockReturnValue({
//         list: jest.fn().mockResolvedValue(listMedics)
//        })
//     const medicUseCase = new MedicUseCase({} as MedicRepository);
//     const medicController = new MedicController(medicUseCase)
//     // ejecucion 
//     const result = await medicController.list(req, res)
//     });
// })