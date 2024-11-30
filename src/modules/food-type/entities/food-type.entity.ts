import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FoodEntity } from '../../foods/entities/food.entity';

@Entity('food_type')
export class FoodTypeEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column({ nullable: false, default: true })
  public isActive: boolean;

  @Column({ nullable: false, length: 128, unique: true })
  public name: string;

  @OneToMany(() => FoodEntity, (food) => food.foodType)
  foods: FoodEntity[];
}
