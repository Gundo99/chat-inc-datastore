import { IsString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  full_name?: string;

  @IsString()
  @IsOptional()
  api_key?: string;
}