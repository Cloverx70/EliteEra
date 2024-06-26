import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('promocode', { schema: 'ecommerce' })
export class promocode {
  @PrimaryColumn('int', { name: 'promocode_id', unique: true })
  promodcodeId: number;
  @Column('varchar', {
    name: 'promocode',
    unique: true,
    nullable: false,
    length: 20,
  })
  promocode: string;
  @Column('int', { name: 'percentage', unique: false, nullable: false })
  percentage: number;
  @Column('int', {
    name: 'timesused',
    unique: false,
    default: 0,
    nullable: false,
  })
  timesUsed: number;
  @Column('date', {
    name: 'expiresat',
    unique: false,
    nullable: false,
  })
  expiresAt: Date;
}
