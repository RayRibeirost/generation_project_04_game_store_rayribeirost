import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ length: 150, default: 'no slug defined' })
  slug: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => Products, (product) => product.category)
  products: Products[];
}
