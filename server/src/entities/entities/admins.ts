import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('admins')
@Unique(['adminID', 'userID'])
export class AdminEntity {
  @PrimaryGeneratedColumn()
  adminID: number;

  @Column()
  userID: number;
}
