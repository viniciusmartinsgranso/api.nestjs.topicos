import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MealService } from '../service/meal.service';
import { CreateMealPayload } from '../models/create-meal.payload';
import { UpdateMealDto } from '../models/update-meal.dto';
import { MealProxy } from '../models/meal.proxy';
import { ProtectTo } from '../../../decorators/protect/protect.decorator';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FoodTypeProxy } from '../../food-type/models/food-type.proxy';
import { FoodProxy } from '../../foods/models/food.proxy';

@ApiTags('Meals')
@Controller('meals')
export class MealsController {
  constructor(private readonly mealService: MealService) {}

  @ProtectTo()
  @Post()
  @ApiOperation({ summary: 'Cria uma nova categoria' })
  @ApiOkResponse({ type: FoodTypeProxy })
  @ApiBody({
    type: CreateMealPayload,
    description: 'Os dados de criação de uma categoria.',
  })
  public async create(
    @Body() createMealDto: CreateMealPayload,
  ): Promise<MealProxy> {
    return this.mealService
      .create(createMealDto)
      .then((meal) => new MealProxy(meal));
  }

  @Get()
  findAll() {
    return this.mealService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealService.findOne(+id);
  }

  @ProtectTo()
  @Get('/:userId')
  @ApiOkResponse({ type: FoodProxy })
  @ApiOperation({ summary: 'Obtém os dados de uma refeição pelo usuário' })
  public async findByUser(
    @Param('userId') userId: number,
  ): Promise<MealProxy[]> {
    return await this.mealService
      .findByUserId(userId)
      .then((meals) => meals.map((meal) => new MealProxy(meal)));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealDto: UpdateMealDto) {
    return this.mealService.update(+id, updateMealDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealService.remove(+id);
  }
}
