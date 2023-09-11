import { UserModel } from '../domain/user.model';
import { BaseRepository } from '../../shared/application/base.repository';

export default interface UserRepository extends BaseRepository<UserModel> {
  // getPhoto (where: object) :Promise<any> ;
}
