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

  @OneToMany(() => Products, (product) => product.category)
  products: Products[];
}
