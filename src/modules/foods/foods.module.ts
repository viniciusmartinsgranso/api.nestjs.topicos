import { Module } from '@nestjs/common';
import { FoodService } from './service/food.service';
import { FoodController } from './controller/food.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodEntity } from './entities/food.entity';

@Module({
  controllers: [FoodController],
  providers: [FoodService],
  exports: [FoodService],
  imports: [TypeOrmModule.forFeature([FoodEntity])],
})
export class FoodsModule {}
