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
import { CategoryService } from '../services/category.service';
import { CategoryEntity } from '../entities/category.entity';
import { UpdateCategoryPayload } from '../models/update-category.payload';
import { CategoryProxy } from '../models/category.proxy';
import { CreateCategoryPayload } from '../models/create-category.payload';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ProtectTo()
  @Post()
  @ApiOperation({ summary: 'Cria uma nova categoria' })
  @ApiOkResponse({ type: CategoryProxy })
  @ApiBody({
    type: CreateCategoryPayload,
    description: 'Os dados de criação de uma categoria.',
  })
  public async create(
    @Body() createCategoryDto: CreateCategoryPayload,
  ): Promise<CategoryProxy> {
    return await this.categoryService
      .create(createCategoryDto)
      .then((entity) => new CategoryProxy(entity));
  }

  @Get()
  @ProtectTo()
  @ApiOperation({ summary: 'Obtém os dados de todos as categorias' })
  @ApiOkResponse({ type: CategoryProxy, isArray: true })
  @ApiQuery({
    name: 'search',
    description: 'A busca a ser realizada',
    required: false,
  })
  public async findAll(
    @Query('search') search: string,
  ): Promise<CategoryProxy[]> {
    return this.categoryService
      .findAll(search)
      .then((result) => result.map((entity) => new CategoryProxy(entity)));
  }

  @ApiOperation({
    summary: 'Obtém os dados de somente as categorias selecionados por Id',
  })
  @ApiOkResponse({ type: CategoryProxy, isArray: true })
  @ApiParam({
    name: 'ids',
    description: 'A busca a ser realizada',
    required: true,
  })
  @ProtectTo()
  @Get('/ids/:ids')
  public async findByIds(@Param('ids') ids: string): Promise<CategoryProxy[]> {
    const newIds = ids.split(',').map(Number);

    return await this.categoryService
      .findByIds(newIds)
      .then((result) => result.map((entity) => new CategoryProxy(entity)));
  }

  @ProtectTo()
  @Get('/:id')
  @ApiOkResponse({ type: CategoryEntity })
  @ApiOperation({ summary: 'Obtém os dados de uma categoria' })
  public async findOne(@Param('id') id: number): Promise<CategoryEntity> {
    return this.categoryService.findOne(id);
  }

  @ProtectTo()
  @Patch('/:id')
  @ApiOkResponse({ type: CategoryEntity })
  public async update(
    @User() requestUser: UserEntity,
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryPayload,
  ): Promise<CategoryEntity> {
    return this.categoryService.update(requestUser, id, updateCategoryDto);
  }

  @ProtectTo()
  @Patch('deactivate/:id')
  @ApiOkResponse({ type: CategoryEntity })
  @ApiOperation({ summary: 'Desativa uma categoria' })
  public async deactivateOne(@Param('id') id: number): Promise<CategoryEntity> {
    return await this.categoryService.deactivateOne(id);
  }

  @ProtectTo()
  @Patch('activate/:id')
  @ApiOkResponse({ type: CategoryEntity })
  @ApiOperation({ summary: 'Ativa uma categoria' })
  public async activateOne(@Param('id') id: number): Promise<CategoryEntity> {
    return await this.categoryService.activateOne(id);
  }

  @ProtectTo()
  @Delete('/:id')
  @ApiOkResponse({ type: CategoryEntity })
  @ApiOperation({ summary: 'Deleta uma categoria' })
  public async delete(@Param('id') id: number): Promise<CategoryEntity> {
    return await this.categoryService.delete(id);
  }
}
