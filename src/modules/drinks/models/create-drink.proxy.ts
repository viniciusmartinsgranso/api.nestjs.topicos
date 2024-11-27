import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber, IsString, MaxLength } from "class-validator";
import { DefaultValidationMessages } from "../../../common/validations/default-validation-messages";

export class CreateDrinkProxy {
  @ApiProperty()
  @IsDefined({ message: 'É necessário informar o nome.' })
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(128, { message: 'O nome não pode ter mais que 128 caracteres.' })
  public name: string;

  @ApiProperty()
  @IsDefined({ message: 'É necessário informar o preço.' })
  @IsNumber()
  public price: number;

  @ApiProperty()
  @IsDefined({ message: 'É necessário informar a imagem.' })
  public imageUrl: string;
}
