import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Products } from '../../product/entities/product.entity';

@Entity({ name: 'tb_publishers' })
export class Publishers {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Products, (product) => product.publisher)
  products: Products[];
}
