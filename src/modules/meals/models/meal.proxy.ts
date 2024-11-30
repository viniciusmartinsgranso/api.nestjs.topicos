import { ApiProperty } from "@nestjs/swagger";
import { MealEntity } from "../entities/meal.entity";
import { MealDetailProxy } from "../../meal-detail/dto/meal-detail.proxy";

export class MealProxy {
  constructor(entity: MealEntity) {
    this.id = entity.id;
    this.userId = entity.user.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.isActive = entity.isActive;
    this.details = entity.mealDetails.map(
      (detail) => new MealDetailProxy(detail),
    );
  }

  @ApiProperty({ description: 'ID of the meal.' })
  public id: number;

  @ApiProperty({ description: 'Data de criação.' })
  public createdAt: Date;

  @ApiProperty({ description: 'Data de atualização.' })
  public updatedAt: Date;

  @ApiProperty({ description: 'Situação.' })
  public isActive: boolean;

  @ApiProperty({ description: 'ID of the associated user.' })
  public userId: number;

  @ApiProperty({ description: 'Details of the meal.' })
  public details: MealDetailProxy[];
}
