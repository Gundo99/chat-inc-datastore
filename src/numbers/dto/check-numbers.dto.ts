import { IsArray, IsString } from 'class-validator';

export class CheckNumbersDto {
  @IsArray()
  @IsString({ each: true })
  numbers: string[];
}