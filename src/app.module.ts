import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/users/user.module';
import { environment } from './environment/environment';
import { AuthModule } from './modules/auth/auth.module';
import { join } from 'path';
import { DrinksModule } from './modules/drinks/drinks.module';
import { MediaModule } from './modules/media/media.module';
import { FoodTypeModule } from "./modules/food-type/food-type.module";
import { FoodsModule } from "./modules/foods/foods.module";
import { MealsModule } from "./modules/meals/meals.module";
import { MealDetailModule } from "./modules/meal-detail/meal-detail.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'postgres',
      entities: [
        join(__dirname, '../../../../modules', '**', '*.schema.{ts,js}'),
      ],
      migrations: [join(__dirname, 'migrations', '*.ts')],
      autoLoadEntities: true,
      synchronize: true,
      logging: environment.DATABASE_LOGGING === 'true',
    }),
    AuthModule,
    UserModule,
    DrinksModule,
    MediaModule,
    FoodTypeModule,
    FoodsModule,
    MealsModule,
    MealDetailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
