import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { MealDetailEntity } from "../../meal-detail/entities/meal-detail.entity";

@Entity('meal')
export class MealEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column({ nullable: false, default: true })
  public isActive: boolean;

  @ManyToOne(() => UserEntity, (user) => user.meals, { eager: true })
  public user: UserEntity;

  @OneToMany(() => MealDetailEntity, (mealDetail) => mealDetail.meal, { cascade: true })
  public mealDetails: MealDetailEntity[];
}
