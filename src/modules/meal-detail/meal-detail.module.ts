import { Module } from '@nestjs/common';
import { MealDetailService } from './service/meal-detail.service';
import { MealDetailController } from './controller/meal-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealDetailEntity } from './entities/meal-detail.entity';

@Module({
  controllers: [MealDetailController],
  providers: [MealDetailService],
  exports: [MealDetailService],
  imports: [TypeOrmModule.forFeature([MealDetailEntity])],
})
export class MealDetailModule {}
