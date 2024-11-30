import { ApiProperty } from '@nestjs/swagger';
import { FoodTypeEntity } from "../entities/food-type.entity";

export class FoodTypeProxy {
  constructor(entity: FoodTypeEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.name = entity.name;
    this.isActive = true;
  }

  @ApiProperty({ type: Number })
  public id: number;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiProperty({ default: true, type: Boolean })
  public isActive: boolean;

  @ApiProperty({ type: String })
  public name!: string;
}
