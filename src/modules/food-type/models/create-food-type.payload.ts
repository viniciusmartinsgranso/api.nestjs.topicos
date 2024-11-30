import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength } from 'class-validator';
import { DefaultValidationMessages } from '../../../common/validations/default-validation-messages';
import { GetManyDefaultResponseProxy } from '../../../common/proxies/get-many-default-response.proxy';
import { FoodTypeProxy } from "./food-type.proxy";

export class CreateFoodTypePayload {
  @ApiProperty()
  @IsDefined({ message: 'É necessário informar o nome.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(128, { message: 'O nome não pode ter mais que 128 caracteres.' })
  public name!: string;
}

export class GetManyDefaultResponseCategoryProxy extends GetManyDefaultResponseProxy {
  @ApiProperty({ type: () => FoodTypeProxy, isArray: true })
  data!: FoodTypeProxy[];
}
