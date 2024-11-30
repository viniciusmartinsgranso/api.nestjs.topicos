import { Injectable } from '@nestjs/common';
import { CreateMealDetailDto } from '../dto/create-meal-detail.dto';
import { UpdateMealDetailDto } from '../dto/update-meal-detail.dto';

@Injectable()
export class MealDetailService {
  create(createMealDetailDto: CreateMealDetailDto) {
    return 'This action adds a new mealDetail';
  }

  findAll() {
    return `This action returns all mealDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mealDetail`;
  }

  update(id: number, updateMealDetailDto: UpdateMealDetailDto) {
    return `This action updates a #${id} mealDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mealDetail`;
  }
}
