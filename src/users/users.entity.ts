import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({type: 'varchar', length: 100})
  userId?: string;

  @Column({type: 'nvarchar', length: 200})
  password?: string;

  @Column({length: 100, nullable: true})
  uuid?: string;

  @Column({type: 'nvarchar', length: 100, nullable: true})
  email?: string;

  @Column({length: 50, nullable: true})
  ip?: string;

  @Column({nullable: true})
  joinDate?: Date;

  @Column({nullable: true})
  lastLogin?: Date;
}