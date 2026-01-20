import { IsNotEmpty } from 'class-validator';
import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categories } from '../../category/entities/category.entity';
import { Publishers } from '../../publisher/entities/publisher.entity';
import { Comments } from '../../comment/entities/comment.entity';

@Entity({ name: 'tb_products' })
@Check(`"price" >= 0`)
@Check(`"stock" >= 0`)
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column({ length: 200, nullable: false })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', array: true, nullable: true })
  images: string[];

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  price: string;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @UpdateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @ManyToOne(() => Categories, (category) => category.products, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ManyToOne(() => Publishers, (publisher) => publisher.products, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'publisher_id' })
  publisher: Publishers;

  @OneToMany(() => Comments, (comment) => comment.product)
  comments: Comments[];
}
