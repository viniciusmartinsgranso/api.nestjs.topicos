import { PartialType } from '@nestjs/swagger';
import { CreateDrinkProxy } from './create-drink.proxy';

export class UpdateDrinkProxy extends PartialType(CreateDrinkProxy) {}
