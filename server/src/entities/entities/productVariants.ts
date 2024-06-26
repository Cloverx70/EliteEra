import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('productvariants', { schema: 'ecommerce' })
export class productvariants {
  @PrimaryColumn('int', { name: 'variantid' })
  variantId: number;
  @Column('boolean', { name: 's', unique: false, default: true })
  small: boolean;
  @Column('boolean', { name: 'm', unique: false, default: true })
  medium: boolean;
  @Column('boolean', { name: 'l', unique: false, default: true })
  large: boolean;
  @Column('boolean', { name: 'xl', unique: false, default: true })
  xlarge: boolean;
  @Column('boolean', { name: 'xxl', unique: false, default: true })
  xxlarge: boolean;
}
