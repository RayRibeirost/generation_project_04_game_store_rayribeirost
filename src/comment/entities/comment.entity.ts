import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Products } from '../../product/entities/product.entity';
import { Users } from '../../user/entities/user.entity';

@Entity({ name: 'tb_comments' })
export class Comments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Products, (product) => product.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Products;

  @ManyToOne(() => Users, (user) => user.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
