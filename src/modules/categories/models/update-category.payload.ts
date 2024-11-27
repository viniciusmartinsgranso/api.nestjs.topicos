import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";
import { DefaultValidationMessages } from "../../../common/validations/default-validation-messages";

export class UpdateCategoryPayload {
  @ApiPropertyOptional()
  @IsString({ message: DefaultValidationMessages.IsString })
  @MaxLength(128, { message: 'O nome não pode ter mais que 128 caracteres.' })
  public name: string;
}
