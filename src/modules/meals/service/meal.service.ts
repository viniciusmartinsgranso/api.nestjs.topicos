import { Injectable } from '@nestjs/common';
import { CreateMealPayload } from '../models/create-meal.payload';
import { UpdateMealDto } from '../models/update-meal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MealEntity } from '../entities/meal.entity';
import { Repository } from 'typeorm';
import { MealDetailEntity } from '../../meal-detail/entities/meal-detail.entity';
import { UserService } from '../../users/services/user.service';
import { FoodService } from '../../foods/service/food.service';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(MealEntity)
    private readonly mealRepository: Repository<MealEntity>,
    @InjectRepository(MealDetailEntity)
    private readonly mealDetailRepository: Repository<MealDetailEntity>,
    private readonly userService: UserService,
    private readonly foodService: FoodService,
  ) {}

  public async create(createMealDto: CreateMealPayload) {
    const user = await this.userService.getUserById(createMealDto.userId);

    const meal = this.mealRepository.create({
      user,
      ...createMealDto,
    });

    await this.mealRepository.save(meal);

    for (const detail of meal.mealDetails) {
      const food = await this.foodService.findById(detail.foodId);
      const totalCalories = food.caloriePerGram * detail.quantityInGrams;

      const mealDetail = this.mealDetailRepository.create({
        meal,
        food,
        quantityInGrams: detail.quantityInGrams,
        totalCalories,
      });

      await this.mealDetailRepository.save(mealDetail);
    }

    return this.mealRepository.findOne({
      where: { id: meal.id },
      relations: ['details', 'details.food'],
    });
  }

  findAll() {
    return `This action returns all meals`;
  }

  public async findByUserId(userId: number): Promise<MealEntity[]> {
    return this.mealRepository.find({
      where: { user: { id: userId } },
      relations: ['details', 'details.food'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} meal`;
  }

  update(id: number, updateMealDto: UpdateMealDto) {
    return `This action updates a #${id} meal`;
  }

  remove(id: number) {
    return `This action removes a #${id} meal`;
  }
}
