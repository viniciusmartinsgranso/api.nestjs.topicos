import { ApiProperty } from "@nestjs/swagger";
import { FoodEntity } from "../entities/food.entity";

export class FoodProxy {
  constructor(entity: FoodEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.caloriePerGram = entity.caloriePerGram;
    this.foodType = entity.foodType.name;
  }

  @ApiProperty({ description: 'ID do alimento.' })
  public id: number;

  @ApiProperty({ description: 'Data de criação.' })
  public createdAt: Date;

  @ApiProperty({ description: 'Data de atualização.' })
  public updatedAt: Date;

  @ApiProperty({ description: 'Situação.' })
  public isActive: boolean;

  @ApiProperty({ description: 'Nome do alimento.' })
  public name: string;

  @ApiProperty({ description: 'Calorias por grama do alimento.' })
  public caloriePerGram: number;

  @ApiProperty({ description: 'Categoria do alimento associado.' })
  public foodType: string;
}
