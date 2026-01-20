import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column({ length: 25, nullable: false })
  username: string;

  @IsNotEmpty()
  @Column({ length: 30, nullable: false })
  password: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
