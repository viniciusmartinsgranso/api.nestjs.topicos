import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateFoodPayload {
  @ApiProperty({ description: 'Name of the food.' })
  @IsDefined({ message: 'Food name is required.' })
  @IsString({ message: 'Food name must be a string.' })
  @MaxLength(128, { message: 'Food name cannot exceed 128 characters.' })
  public name!: string;

  @ApiProperty({ description: 'Calories per gram of the food.' })
  @IsDefined({ message: 'Calories per gram is required.' })
  @IsNumber({}, { message: 'Calories per gram must be a number.' })
  public caloriesPerGram!: number;

  @ApiProperty({ description: 'ID of the associated food type.' })
  @IsDefined({ message: 'Food type ID is required.' })
  @IsNumber({}, { message: 'Food type ID must be a number.' })
  public foodTypeId!: number;
}
