import { IsArray, IsString, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class NumberEntry {
  @IsString()
  telephone_number: string;

  @IsBoolean()
  has_whatsapp: boolean;
}

export class AddNumbersDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NumberEntry)
  numbers: NumberEntry[];
}