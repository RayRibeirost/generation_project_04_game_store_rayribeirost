import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Products } from '../../product/entities/product.entity';

@Entity({ name: 'tb_categories' })
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 150, nullable: false })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 150, default: 'no slug defined', unique: true })
  slug: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @UpdateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => Products, (product) => product.category)
  products: Products[];
}
