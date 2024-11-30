import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FoodTypeController } from "./controllers/food-type.controller";
import { FoodTypeService } from "./services/food-type.service";
import { FoodTypeEntity } from "./entities/food-type.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FoodTypeEntity])],
  controllers: [FoodTypeController],
  providers: [FoodTypeService],
  exports: [FoodTypeService],
})
export class FoodTypeModule {}
