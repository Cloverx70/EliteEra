import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('statistics', { schema: 'ecommerce' })
export class statistics {
  @PrimaryColumn('int', { name: 'statid' })
  statId: number;
  @Column('int', { name: 'totalearnings', unique: false, default: 0 })
  totalEarnings: number;
  @Column('int', { name: 'totalusers', unique: false, default: 0 })
  totalUsers: number;
  @Column('int', { name: 'totalproducts', unique: false, default: 0 })
  totalProducts: number;
  @Column('int', { name: 'totalpurchases', unique: false, default: 0 })
  totalPurchases: number;
  @Column('int', { name: 'totalorders', unique: false, default: 0 })
  totalOrders: number;
}
