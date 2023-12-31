import { DatabaseBootstrap } from "@bootstrap/database.boostrap";
import Result from "@shared/application/result.interface";
import { DataSource, ObjectType, Repository } from "typeorm";
import { ResponseDto } from "../application/response.dto";
import * as _ from "lodash";

export class BaseOperation<T> {
  protected static appDataSource: DataSource;

  constructor(protected entity: ObjectType<T>) {
  }
  async list(where: object = {}, relations: string[] = [], order: object = {}): Promise<Result<T>> {
    const repository: Repository<T> = DatabaseBootstrap.dataSource.getRepository(this.entity);
    const data: T[] = await repository.find({ where, relations, order });
    // ? darle la forma del result 
    return ResponseDto.format("", data);

  }
  async getOne(where: object = {}, relations: string[] = []): Promise<Result<T>> {
    const repository: Repository<T> = DatabaseBootstrap.dataSource.getRepository(this.entity);
    const data: T = await repository.findOne({ where, relations });
    // ? darle la forma del result 
    return ResponseDto.format("", data);
  }
  async getPage(page: number, pageSize: number, where: object = {}, relations: string[] = [], order: object = {}): Promise<Result<T>> {
    const repository: Repository<T> = DatabaseBootstrap.dataSource.getRepository(this.entity);
    const [data, total] = await repository.findAndCount({
      where, relations, order, skip: page * pageSize, take: pageSize
    });
    return ResponseDto.format("", data, total);
  }

  async insert(entity: T): Promise<Result<T>> {
    const repository: Repository<T> = DatabaseBootstrap.dataSource.getRepository(this.entity);
    const instance = repository.create(entity);
    const data: T = await repository.save(instance);
    return ResponseDto.format('', data);
  }

  async update(entity: Partial<T>, where: object = {}, relations: string[] = []): Promise<Result<T>> {
    const repository: Repository<T> = DatabaseBootstrap.dataSource.getRepository(this.entity);
    let recordsToUpdate: any[] = await repository.find({ where, relations });

    recordsToUpdate = recordsToUpdate.map((record: any) =>
      _.merge(record, entity)
    );
    await repository.save(recordsToUpdate);
    return ResponseDto.format('', recordsToUpdate);

  }
  async delete(where: object): Promise<Result<T>> {
    throw new Error('not implemented');

  }
}
