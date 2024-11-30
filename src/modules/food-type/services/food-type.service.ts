import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { FoodTypeEntity } from "../entities/food-type.entity";
import { CreateFoodTypePayload } from "../models/create-food-type.payload";
import { UpdateFoodTypePayload } from "../models/update-food-type.payload";

@Injectable()
export class FoodTypeService {
  constructor(
    @InjectRepository(FoodTypeEntity)
    private readonly repository: Repository<FoodTypeEntity>,
  ) {}

  public getRepository(): Repository<FoodTypeEntity> {
    return this.repository;
  }

  public async create(
    createCategoryDto: CreateFoodTypePayload,
  ): Promise<FoodTypeEntity> {
    const entity = await this.repository.findOneBy({
      name: createCategoryDto.name,
    });

    if (entity)
      throw new ForbiddenException('Tipo de comida já cadastrada.' );

    return this.repository.save(createCategoryDto);
  }

  public async findAll(search: string): Promise<FoodTypeEntity[]> {
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

  public async findOne(id: number): Promise<FoodTypeEntity> {
    const category = await this.repository.findOne({ where: { id } });

    if (!category)
      throw new NotFoundException('A categoria não foi encontrado');

    return category;
  }

  public async update(
    requestUser: UserEntity,
    id: number,
    payload: UpdateFoodTypePayload,
  ): Promise<FoodTypeEntity> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity)
      throw new NotFoundException('Não foi possível encontrar a categoria');

    entity.name = payload.name;

    return this.repository.save(entity);
  }

  public async deactivateOne(id: number): Promise<FoodTypeEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) throw new NotFoundException();

    entity.isActive = false;

    return this.repository.save(entity);
  }

  public async activateOne(id: number): Promise<FoodTypeEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) throw new NotFoundException();

    entity.isActive = true;

    return this.repository.save(entity);
  }

  public async delete(id: number): Promise<FoodTypeEntity> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) throw new NotFoundException();

    return this.repository.remove(entity);
  }

  public async findByIds(ids: number[]): Promise<FoodTypeEntity[]> {
    const categoriesList: FoodTypeEntity[] = [];

    for (const id of ids) {
      const categories = await this.repository.findOneBy({
        id,
      });

      categoriesList.push(categories);
    }

    return categoriesList;
  }
}
