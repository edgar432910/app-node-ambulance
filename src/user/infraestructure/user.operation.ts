import { UserRepository } from "../application/user.repository";
import { UserModel } from "../domain/user.model";
const users = [
  { name: "juan", age: 20 },
  { name: "ed", age: 21 },
  { name: "and", age: 22 },
];
export default class implements UserRepository {
  list(): UserModel[] {
    return users;
  }
  getOne(age: number): UserModel {
    return users.find((el) => el.age === age) ?? ({} as UserModel);
  }
  insert(user: UserModel): UserModel {
    users.push(user);
    return user;
  }
}
