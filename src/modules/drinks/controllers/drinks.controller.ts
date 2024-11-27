import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Query
} from "@nestjs/common";
import { DrinksService } from '../services/drinks.service';
import { CreateDrinkProxy } from '../models/create-drink.proxy';
import { UpdateDrinkProxy } from '../models/update-drink.proxy';
import { ProtectTo } from '../../../decorators/protect/protect.decorator';
import { ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { DrinkProxy } from '../models/drink.proxy';
import { DrinkEntity } from "../entities/drink.entity";

@ApiTags('Drinks')
@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Post()
  @ProtectTo()
  @ApiOkResponse({ type: DrinkProxy })
  @ApiOperation({
    summary: 'Operação que cria uma bebida',
  })
  @ApiBody({
    type: CreateDrinkProxy,
    description: 'Operação que cria uma bebida.',
  })
  public async create(
    @Body() createDrinkDto: CreateDrinkProxy,
  ): Promise<DrinkProxy> {
    return this.drinksService
      .create(createDrinkDto)
      .then((drink) => new DrinkProxy(drink));
  }

  @Get()
  @ProtectTo()
  @ApiOkResponse({ type: DrinkProxy, isArray: true })
  @ApiOperation({
    summary: 'Obtém todas as bebidas.',
  })
  @ApiQuery({
    name: 'search',
    description: 'A busca a ser realizada',
    required: false,
  })
  public async findAll(@Query('search') search: string): Promise<DrinkProxy[]> {
    return await this.drinksService
      .findAll(search)
      .then((drinks) => drinks.map((drink) => new DrinkProxy(drink)));
  }

  @Get(':id')
  @ProtectTo()
  @ApiOkResponse({ type: DrinkProxy })
  @ApiOperation({
    summary: 'Obtém a bebida específica.',
  })
  public async findOne(@Param('id') id: number): Promise<DrinkProxy> {
    return this.drinksService
      .findOne(id)
      .then((drink) => new DrinkProxy(drink));
  }

  @Patch(':id')
  @ProtectTo()
  @ApiOkResponse({ type: DrinkProxy })
  @ApiOperation({
    summary: 'Atualiza a bebida específica.',
  })
  public async update(
    @Param('id') id: number,
    @Body() updateDrinkDto: UpdateDrinkProxy,
  ): Promise<DrinkProxy> {
    return await this.drinksService
      .update(id, updateDrinkDto)
      .then((drink) => new DrinkProxy(drink));
  }

  @Patch('deactivate/:id')
  @ProtectTo()
  @ApiOkResponse({ type: DrinkProxy })
  @ApiOperation({
    summary: 'Desativa a bebida específica.',
  })
  public async deactivate(@Param('id') id: number): Promise<DrinkProxy> {
    return await this.drinksService
      .deactivate(id)
      .then((drink) => new DrinkProxy(drink));
  }

  @Patch('activate/:id')
  @ProtectTo()
  @ApiOkResponse({ type: DrinkProxy })
  @ApiOperation({
    summary: 'Ativa a bebida específica.',
  })
  public async activate(@Param('id') id: number): Promise<DrinkProxy> {
    return await this.drinksService
      .activate(id)
      .then((drink) => new DrinkProxy(drink));
  }

  @Delete(':id')
  @ApiOkResponse({ type: DrinkProxy })
  public async delete(@Param('id') id: number): Promise<DrinkEntity> {
    return await this.drinksService.remove(id);
  }
}
