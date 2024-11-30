import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, IsNumber } from "class-validator";

export class CreateMealPayload {
  @ApiProperty({ description: 'ID of the user.' })
  @IsDefined({ message: 'User ID is required.' })
  @IsNumber({}, { message: 'User ID must be a number.' })
  public userId!: number;

  @ApiProperty({
    description: 'Details of the meal (food ID and quantity in grams).',
    type: Array,
    example: [{ foodId: 1, quantityInGrams: 150 }]
  })
  @IsDefined({ message: 'Meal details are required.' })
  @IsArray({ message: 'Meal details must be an array.' })
  public details!: { foodId: number; quantityInGrams: number }[];
}
