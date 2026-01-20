import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comments } from '../../comment/entities/comment.entity';

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

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];
}
