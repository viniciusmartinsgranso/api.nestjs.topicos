import { Module } from '@nestjs/common';
import { MealService } from './service/meal.service';
import { MealsController } from './controller/meals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealEntity } from './entities/meal.entity';
import { MealDetailModule } from '../meal-detail/meal-detail.module';
import { UserModule } from '../users/user.module';
import { FoodsModule } from '../foods/foods.module';
import { MealDetailEntity } from '../meal-detail/entities/meal-detail.entity';

@Module({
  controllers: [MealsController],
  providers: [MealService],
  exports: [MealService],
  imports: [
    TypeOrmModule.forFeature([MealEntity, MealDetailEntity]),
    MealDetailModule,
    UserModule,
    FoodsModule,
  ],
})
export class MealsModule {}
