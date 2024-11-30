import { PartialType } from '@nestjs/swagger';
import { CreateMealDetailDto } from './create-meal-detail.dto';

export class UpdateMealDetailDto extends PartialType(CreateMealDetailDto) {}
