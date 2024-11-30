import { PartialType } from '@nestjs/swagger';
import { CreateFoodPayload } from './create-food.payload';

export class UpdateFoodPayload extends PartialType(CreateFoodPayload) {}
