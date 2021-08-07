import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LoginLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  userId: string;

  @Column()
  uuid: string;

  @Column({ type: 'datetime2' })
  timestamp: Date;
}