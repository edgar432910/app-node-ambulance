// domain
class Medic {
  private name: string;
  private lastname: string;
  private cmp: string;
  private grade: number;

  constructor(name: string, lastname: string, cmp: string, grade: number) {
    if (cmp.length < 5) {
      throw new Error("CMP must have 5 characters at least");
    }
    if (grade < 1 || grade > 10) throw new Error("Error in grade");

    this.name = name;
    this.lastname = lastname;
    this.cmp = cmp;
    this.grade = grade;
  }
}
// crear en la capa de dominio una interfaz, crear una pared en las capas,
// interfaz es para separar capaz repository
// listlosk, principio de sustitucion
interface MedicRepository {
  create(medic: Medic): void;
}
// Domain | interface como pared para aislar
// Aplication
class MedicInsertCaseUse {
  private infraestructure: MedicRepository;
  constructor(infraestructure: MedicInfraestructure) {
    this.infraestructure = infraestructure;
  }
  insert(medic: Medic) {
    this.infraestructure.create(medic);
  }
}

// Infraestructure
class MedicInfraestructure implements MedicRepository {
  create(medic: Medic): void {
    console.log(`Medic insert : ${JSON.stringify(medic, null, "\t")}`);
  }
  getConnection() {
    console.log("Connection to database");
  }
}

const medic = new Medic("Daniela", "Salazar", "12345", 2);
const infraestructure = new MedicInfraestructure();
const application = new MedicInsertCaseUse(infraestructure);
application.insert(medic);

class Upload {
  save() {
    console.log("upload file");
  }
  statusConnectionInternet() {}
}

class UploadAws extends Upload {}

class UploadGoogle extends Upload {}

class UploadOnPremise extends Upload {}

const upload: Upload = new UploadGoogle();
upload.save();
