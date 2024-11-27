import { Module } from '@nestjs/common';
import { DrinksService } from './services/drinks.service';
import { DrinksController } from './controllers/drinks.controller';
import { DrinkEntity } from './entities/drink.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DrinksController],
  providers: [DrinksService],
  exports: [DrinksService],
  imports: [TypeOrmModule.forFeature([DrinkEntity])],
})
export class DrinksModule {}
