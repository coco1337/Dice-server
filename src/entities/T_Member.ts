import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class T_Member {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  userId?: string;

  @Column()
  password?: string;

  @Column()
  uuid?: string;

  @Column()
  ip?: string;

  @Column()
  joinDate?: string;

  @Column()
  lastUpdate?: string;

  @Column()
  lastLogin?: string;
}