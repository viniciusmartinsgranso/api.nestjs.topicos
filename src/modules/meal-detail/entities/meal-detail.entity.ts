import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MealEntity } from "../../meals/entities/meal.entity";
import { FoodEntity } from "../../foods/entities/food.entity";

@Entity('meal_detail')
export class MealDetailEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column({ nullable: false, default: true })
  public isActive: boolean;

  @Column({ type: 'number', nullable: false })
  public foodId: number;

  @Column({ type: 'number', nullable: false })
  public mealId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  public quantityInGrams: number;

  @Column('decimal', { precision: 10, scale: 2 })
  public totalCalories: number;

  @ManyToOne(() => MealEntity, (meal) => meal.mealDetails)
  public meal: MealEntity;

  @ManyToOne(() => FoodEntity, { eager: true })
  public food: FoodEntity;
}
