import { FoodTypeEntity } from "../../food-type/entities/food-type.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('food')
export class FoodEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column({ nullable: false, default: true })
  public isActive: boolean;

  @Column({ nullable: false })
  public name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  public caloriePerGram: number;

  @ManyToOne(() => FoodTypeEntity, (foodType) => foodType.foods, {
    eager: true,
  })
  foodType: FoodTypeEntity;
}
