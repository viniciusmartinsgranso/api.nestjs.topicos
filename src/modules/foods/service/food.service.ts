import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateFoodPayload } from '../models/create-food.payload';
import { UpdateFoodPayload } from '../models/update-food.payload';
import { Like, Repository } from "typeorm";
import { FoodEntity } from '../entities/food.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(FoodEntity)
    private repository: Repository<FoodEntity>,
  ) {}

  public async create(createFoodDto: CreateFoodPayload) {
    const hasEntity = await this.repository.findOneBy({
      name: createFoodDto.name,
    });

    if (hasEntity) throw new ForbiddenException('Categoria já cadastrado.');

    return this.repository.save(createFoodDto);
  }

  public async findAll(search: string): Promise<FoodEntity[]> {
    const foods = await this.repository.find({
      order: {
        name: 'ASC',
      },
      where: search ? { name: Like('%' + search + '%') } : {},
    });

    if (!foods.length)
      throw new NotFoundException('Ocorreu um erro interno.');

    return foods;
  }

  public async findById(id: number): Promise<FoodEntity> {
    const food = await this.repository.findOneBy({ id });
    if (!food) {
      throw new BadRequestException('Food not found.');
    }
    return food;
  }

  update(id: number, updateFoodDto: UpdateFoodPayload) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
