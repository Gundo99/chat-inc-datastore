import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Numbers {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column()
  telephone_number: string;

  @Column({ default: false })
  has_whatsapp: boolean;

  @Column()
  user_uid: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_added: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date_modified: Date;
}
