import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import BasePersonal from './base-personal';

@Entity({ name: "driver" })
export class Driver extends BasePersonal {
    @PrimaryGeneratedColumn()
    id: number;
}