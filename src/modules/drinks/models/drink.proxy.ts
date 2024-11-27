import { ApiProperty } from '@nestjs/swagger';
import { DrinkEntity } from '../entities/drink.entity';

export class DrinkProxy {
  constructor(entity: DrinkEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.isActive = entity.isActive;
    this.imageUrl = entity.imageUrl;
    this.price = entity.price;
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
  public name: string;

  @ApiProperty({ type: Number })
  public price: number;

  @ApiProperty({ type: String })
  public imageUrl: string;
}
