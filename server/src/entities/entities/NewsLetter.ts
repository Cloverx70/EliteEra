import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity('newsletter', { schema: 'ecommerce' })
@Index('emailid', ['emailId'], { unique: true })
@Index('email', ['email'], { unique: true })
export class Newsletter {
  @PrimaryColumn('int', { primary: true, unique: true, name: 'email_id' })
  emailId: number;

  @Column('varchar', {
    name: 'email',
    unique: true,
    nullable: false,
    length: 100,
  })
  email: string;
}
