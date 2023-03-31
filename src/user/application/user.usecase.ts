import { UserRepository } from "./user.repository";
import { UserModel } from "../domain/user.model";
export default class {
  constructor(private userRepository: UserRepository) {}
  list() {
    return this.userRepository.list();
  }
  getOne(age: number) {
    return this.userRepository.getOne(age);
  }
  insert(user: UserModel) {
    return this.userRepository.insert(user);
  }
}
