import { IsArray, IsString, IsBoolean, IsNumber} from 'class-validator';
import { Type } from 'class-transformer';

export class AddNumbersDto {
  @IsString()
  telephone_number: string;

  @IsBoolean()
  has_whatsapp: boolean;

  @IsNumber()
  id: number; // Changed to be a number instead of an array
}