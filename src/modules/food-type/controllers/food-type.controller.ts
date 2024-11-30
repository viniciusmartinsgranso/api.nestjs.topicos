import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProtectTo } from '../../../decorators/protect/protect.decorator';
import { User } from '../../../decorators/user/user.decorator';
import { UserEntity } from '../../users/entities/user.entity';
import { FoodTypeService } from '../services/food-type.service';
import { FoodTypeEntity } from '../entities/food-type.entity';
import { UpdateFoodTypePayload } from '../models/update-food-type.payload';
import { FoodTypeProxy } from '../models/food-type.proxy';
import { CreateFoodTypePayload } from '../models/create-food-type.payload';

@ApiTags('Food Type')
@Controller('food-type')
export class FoodTypeController {
  constructor(private readonly categoryService: FoodTypeService) {}

  @ProtectTo()
  @Post()
  @ApiOperation({ summary: 'Cria uma nova categoria' })
  @ApiOkResponse({ type: FoodTypeProxy })
  @ApiBody({
    type: CreateFoodTypePayload,
    description: 'Os dados de criação de uma categoria.',
  })
  public async create(
    @Body() createCategoryDto: CreateFoodTypePayload,
  ): Promise<FoodTypeProxy> {
    return await this.categoryService
      .create(createCategoryDto)
      .then((entity) => new FoodTypeProxy(entity));
  }

  @Get()
  @ProtectTo()
  @ApiOperation({ summary: 'Obtém os dados de todos as categorias' })
  @ApiOkResponse({ type: FoodTypeProxy, isArray: true })
  @ApiQuery({
    name: 'search',
    description: 'A busca a ser realizada',
    required: false,
  })
  public async findAll(
    @Query('search') search: string,
  ): Promise<FoodTypeProxy[]> {
    return this.categoryService
      .findAll(search)
      .then((result) => result.map((entity) => new FoodTypeProxy(entity)));
  }

  @ApiOperation({
    summary: 'Obtém os dados de somente as categorias selecionados por Id',
  })
  @ApiOkResponse({ type: FoodTypeProxy, isArray: true })
  @ApiParam({
    name: 'ids',
    description: 'A busca a ser realizada',
    required: true,
  })
  @ProtectTo()
  @Get('/ids/:ids')
  public async findByIds(@Param('ids') ids: string): Promise<FoodTypeProxy[]> {
    const newIds = ids.split(',').map(Number);

    return await this.categoryService
      .findByIds(newIds)
      .then((result) => result.map((entity) => new FoodTypeProxy(entity)));
  }

  @ProtectTo()
  @Get('/:id')
  @ApiOkResponse({ type: FoodTypeEntity })
  @ApiOperation({ summary: 'Obtém os dados de uma categoria' })
  public async findOne(@Param('id') id: number): Promise<FoodTypeEntity> {
    return this.categoryService.findOne(id);
  }

  @ProtectTo()
  @Patch('/:id')
  @ApiOkResponse({ type: FoodTypeEntity })
  public async update(
    @User() requestUser: UserEntity,
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateFoodTypePayload,
  ): Promise<FoodTypeEntity> {
    return this.categoryService.update(requestUser, id, updateCategoryDto);
  }

  @ProtectTo()
  @Patch('deactivate/:id')
  @ApiOkResponse({ type: FoodTypeEntity })
  @ApiOperation({ summary: 'Desativa uma categoria' })
  public async deactivateOne(@Param('id') id: number): Promise<FoodTypeEntity> {
    return await this.categoryService.deactivateOne(id);
  }

  @ProtectTo()
  @Patch('activate/:id')
  @ApiOkResponse({ type: FoodTypeEntity })
  @ApiOperation({ summary: 'Ativa uma categoria' })
  public async activateOne(@Param('id') id: number): Promise<FoodTypeEntity> {
    return await this.categoryService.activateOne(id);
  }

  @ProtectTo()
  @Delete('/:id')
  @ApiOkResponse({ type: FoodTypeEntity })
  @ApiOperation({ summary: 'Deleta uma categoria' })
  public async delete(@Param('id') id: number): Promise<FoodTypeEntity> {
    return await this.categoryService.delete(id);
  }
}
