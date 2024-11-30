import { ApiProperty } from "@nestjs/swagger";
import { MealDetailEntity } from "../entities/meal-detail.entity";

export class MealDetailProxy {
  constructor(entity: MealDetailEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.isActive = entity.isActive;
    this.food = entity.food.name;
    this.quantityInGrams = entity.quantityInGrams;
    this.totalCalories = entity.totalCalories;
  }

  @ApiProperty({ description: 'ID of the meal.' })
  public id: number;

  @ApiProperty({ description: 'Data de criação.' })
  public createdAt: Date;

  @ApiProperty({ description: 'Data de atualização.' })
  public updatedAt: Date;

  @ApiProperty({ description: 'Situação.' })
  public isActive: boolean;

  @ApiProperty({ description: 'Name of the associated food.' })
  public food: string;

  @ApiProperty({ description: 'Quantity in grams of the food.' })
  public quantityInGrams: number;

  @ApiProperty({ description: 'Total calories of the food consumed.' })
  public totalCalories: number;
}
