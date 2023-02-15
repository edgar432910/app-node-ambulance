class Medic {
  // private name:string;
  // private lastname:string;
  // private age:number;
  // constructor(nameMedic:string, lastnameMedic:string, ageMedic:number){
  //   this.name = nameMedic;
  //   this.lastname = lastnameMedic;
  //   this.age = ageMedic;
  // }
  constructor(
    private name: string,
    private lastname: string,
    ageMedic: number
  ) {}
  getName(): string {
    return this.name;
  }
  get valueName(): string {
    return this.name;
  }
  set valueName(name: string) {
    this.name = name;
  }
}

const medic = new Medic("juan", "rod", 1);
medic.valueName = "edgar";
console.log(medic.valueName);
