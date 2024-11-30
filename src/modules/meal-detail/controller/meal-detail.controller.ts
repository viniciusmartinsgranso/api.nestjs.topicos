import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MealDetailService } from '../service/meal-detail.service';
import { CreateMealDetailDto } from '../dto/create-meal-detail.dto';
import { UpdateMealDetailDto } from '../dto/update-meal-detail.dto';
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Meal Detail')
@Controller('meal-detail')
export class MealDetailController {
  constructor(private readonly mealDetailService: MealDetailService) {}

  @Post()
  create(@Body() createMealDetailDto: CreateMealDetailDto) {
    return this.mealDetailService.create(createMealDetailDto);
  }

  @Get()
  findAll() {
    return this.mealDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealDetailDto: UpdateMealDetailDto) {
    return this.mealDetailService.update(+id, updateMealDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealDetailService.remove(+id);
  }
}
