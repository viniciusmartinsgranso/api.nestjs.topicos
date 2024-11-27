import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDrinkProxy } from '../models/create-drink.proxy';
import { UpdateDrinkProxy } from '../models/update-drink.proxy';
import { DrinkEntity } from '../entities/drink.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { DrinkProxy } from "../models/drink.proxy";

@Injectable()
export class DrinksService {
  constructor(
    @InjectRepository(DrinkEntity)
    private readonly repository: Repository<DrinkEntity>,
  ) {}

  public async create(createDrinkDto: CreateDrinkProxy): Promise<DrinkProxy> {
    const entity = await this.repository.findOneBy({
      name: createDrinkDto.name,
    });

    if (entity)
      throw new NotFoundException(`A bebida ${entity.name} já existe.`);

    return await this.repository.save(createDrinkDto);
  }

  public async findAll(search: string): Promise<DrinkEntity[]> {
    return await this.repository.find({
      order: {
        name: 'ASC',
      },
      where: search ? { name: Like('%' + search + '%') } : {},
    });
  }

  public async findOne(id: number): Promise<DrinkEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Bebida não encontrada.');

    return entity;
  }

  public async update(
    id: number,
    updateDrinkDto: UpdateDrinkProxy,
  ): Promise<DrinkEntity> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) throw new NotFoundException('Bebida não encontrada');

    const hasEntity = await this.repository.findOneBy({
      name: updateDrinkDto.name,
    });

    if (hasEntity)
      throw new ForbiddenException('Já existe uma bebida com esse nome.');

    entity.name = updateDrinkDto.name;
    entity.price = updateDrinkDto.price;

    return await this.repository.save(entity);
  }

  public async deactivate(id: number): Promise<DrinkEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) throw new NotFoundException('Bebida não encontrada.');

    entity.isActive = false;

    return await this.repository.save(entity);
  }

  public async activate(id: number): Promise<DrinkEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) throw new NotFoundException('Bebida não encontrada.');

    entity.isActive = true;

    return await this.repository.save(entity);
  }

  public async remove(id: number): Promise<DrinkEntity> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) throw new NotFoundException('Bebida não encontrada');

    return await this.repository.remove(entity);
  }
}
