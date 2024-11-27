import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { CategoryEntity } from "../entities/category.entity";
import { CreateCategoryPayload } from "../models/create-category.payload";
import { CategoryProxy } from "../models/category.proxy";
import { UpdateCategoryPayload } from "../models/update-category.payload";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}

  public getRepository(): Repository<CategoryEntity> {
    return this.repository;
  }

  public async create(
    createCategoryDto: CreateCategoryPayload,
  ): Promise<CategoryProxy> {
    const hasCategory = await this.repository.findOneBy({
      name: createCategoryDto.name,
    });

    if (hasCategory)
      throw new ForbiddenException('Categoria já cadastrado.' );

    return this.repository.save(createCategoryDto);
  }

  public async findAll(search: string): Promise<CategoryEntity[]> {
    const categories = await this.repository.find({
      order: {
        name: 'ASC',
      },
      where: search ? { name: Like('%' + search + '%') } : {},
    });

    if (!categories.length)
      throw new NotFoundException('Ocorreu um erro interno.');

    return categories;
  }

  public async findOne(id: number): Promise<CategoryEntity> {
    const category = await this.repository.findOne({ where: { id } });

    if (!category)
      throw new NotFoundException('A categoria não foi encontrado');

    return category;
  }

  public async update(
    requestUser: UserEntity,
    id: number,
    payload: UpdateCategoryPayload,
  ): Promise<CategoryEntity> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity)
      throw new NotFoundException('Não foi possível encontrar a categoria');

    entity.name = payload.name;

    return this.repository.save(entity);
  }

  public async deactivateOne(id: number): Promise<CategoryEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) throw new NotFoundException();

    entity.isActive = false;

    return this.repository.save(entity);
  }

  public async activateOne(id: number): Promise<CategoryEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) throw new NotFoundException();

    entity.isActive = true;

    return this.repository.save(entity);
  }

  public async delete(id: number): Promise<CategoryEntity> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) throw new NotFoundException();

    return this.repository.remove(entity);
  }

  public async findByIds(ids: number[]): Promise<CategoryEntity[]> {
    const categoriesList: CategoryEntity[] = [];

    for (const id of ids) {
      const categories = await this.repository.findOneBy({
        id,
      });

      categoriesList.push(categories);
    }

    return categoriesList;
  }
}
