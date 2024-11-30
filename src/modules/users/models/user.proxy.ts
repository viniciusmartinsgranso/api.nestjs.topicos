import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { GetManyDefaultResponseProxy } from '../../../common/proxies/get-many-default-response.proxy';
import { RolesEnum } from '../../../common/enums/roles.enum';
import { MealProxy } from "../../meals/models/meal.proxy";

export class UserProxy {
  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.isActive = entity.isActive;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.name = entity.name;
    this.email = entity.email;
    this.roles = entity.roles;
  }

  @ApiProperty({ type: Number })
  public id: number;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiProperty({ default: true, type: Boolean })
  public isActive: boolean;

  @ApiProperty({ type: String })
  public name!: string;

  @ApiProperty({ type: String })
  public email!: string;

  @ApiProperty({ type: String })
  public password!: string;

  @ApiProperty()
  public roles: RolesEnum[];

  @ApiProperty({ description: 'List of meals associated with the user.', type: [MealProxy] })
  public meals: MealProxy[];
}

export class GetManyDefaultResponseUserProxy extends GetManyDefaultResponseProxy {
  @ApiProperty({ type: () => UserProxy, isArray: true })
  data!: UserProxy[];
}
