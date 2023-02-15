// domain
interface Medic {
  name: string;
  lastname: string;
  age: number;
}

// const medic:Medic = {name:"julia", lastname:"e", age:1};
//  Application
interface Repository {
  insert(medic: Medic): Medic;
}

class MedicUseCase {
  constructor(public medicOperation: Repository) {}
  //  constructor(public medicOperation:MedicOperation){}

  //  insert(name:string, lastname:string, age:number){}
  insert(medic: Medic) {
    // logica
    medic.name = medic.name.toUpperCase();
    medic.lastname = medic.lastname.toUpperCase();
    // insercion
    // const medicOperation = new MedicOperation();
    this.medicOperation.insert(medic);
  }
}

// infraestructure
class MedicOperation implements Repository {
  insert(medic: Medic): Medic {
    console.log({ medic });
    // aca se inserta los datos a bd
    return medic;
  }
  update(medic: Medic, id: number): Medic {
    return medic;
  }
}

const medic: Medic = { name: "jorge", lastname: "montoya", age: 33 };
const medicOperation = new MedicOperation();
const medicUseCase = new MedicUseCase(medicOperation);
medicUseCase.insert(medic);
