import { PartialType } from '@nestjs/swagger';
import { CreateMealPayload } from './create-meal.payload';

export class UpdateMealDto extends PartialType(CreateMealPayload) {}
