import { Column, Entity, Index } from 'typeorm';

@Index('email', ['email'], { unique: true })
@Index('IDX_97672ac88f789774dd47f7c8be', ['email'], { unique: true })
@Index('IDX_fe0bb3f6520ee0469504521e71', ['username'], { unique: true })
@Index('user_id', ['userId'], { unique: true })
@Index('username', ['username'], { unique: true })
@Entity('users', { schema: 'ecommerce' })
export class Users {
  @Column('int', { primary: true, name: 'user_id' })
  userId: number;

  @Column('varchar', {
    name: 'user_pfp',
    unique: false,
    length: 900,
    default: '',
  })
  userpfp: string | null;

  @Column('varchar', { name: 'username', unique: true, length: 50 })
  username: string;

  @Column('varchar', { name: 'fullname', length: 60 })
  fullname: string;

  @Column('varchar', { name: 'email', unique: true, length: 100 })
  email: string;

  @Column('varchar', { name: 'passwordhash', length: 500 })
  passwordhash: string;

  @Column('varchar', { name: 'addressOne', length: 500 })
  addressOne: string;

  @Column('varchar', { name: 'addressTwo', length: 500 })
  addressTwo: string | null;

  @Column('datetime', { name: 'birthdate' })
  birthdate: Date;

  @Column('int', { name: 'total_spendings', default: 0 })
  totalSpendings: number;

  @Column('int', { name: 'ongoing_orders', default: 0 })
  ongoingOrders: number;

  @Column('int', { name: 'completed_orders', default: 0 })
  completedOrders: number;

  @Column('int', { name: 'cancelled_orders', default: 0 })
  cancelledOrders: number;
}
