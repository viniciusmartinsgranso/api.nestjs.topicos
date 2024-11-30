import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FoodService } from '../service/food.service';
import { CreateFoodPayload } from '../models/create-food.payload';
import { UpdateFoodPayload } from '../models/update-food.payload';
import { ProtectTo } from '../../../decorators/protect/protect.decorator';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery, ApiTags
} from "@nestjs/swagger";
import { FoodTypeProxy } from '../../food-type/models/food-type.proxy';
import { FoodProxy } from '../models/food.proxy';

@ApiTags('Foods')
@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @ProtectTo()
  @Post()
  @ApiOperation({ summary: 'Cria um novo alimento' })
  @ApiOkResponse({ type: FoodTypeProxy })
  @ApiBody({
    type: CreateFoodPayload,
    description: 'Os dados de criação de um alimento.',
  })
  public async create(
    @Body() createFoodDto: CreateFoodPayload,
  ): Promise<FoodProxy> {
    return this.foodService
      .create(createFoodDto)
      .then((food) => new FoodProxy(food));
  }

  @Get()
  @ProtectTo()
  @ApiOperation({ summary: 'Obtém os dados de todos os alimentos' })
  @ApiOkResponse({ type: FoodProxy, isArray: true })
  @ApiQuery({
    name: 'search',
    description: 'A busca a ser realizada',
    required: false,
  })
  public async findAll(@Query('search') search: string) {
    return this.foodService
      .findAll(search)
      .then((food) => food.map((entity) => new FoodProxy(entity)));
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.foodService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFoodDto: UpdateFoodPayload) {
    return this.foodService.update(+id, updateFoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodService.remove(+id);
  }
}
