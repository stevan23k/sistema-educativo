import { Roles } from '../auth.model';
import { IsString, IsNotEmpty } from 'class-validator';

export class RegistroDTO {
  @IsString()
  @IsNotEmpty()
  nombres: string;
  @IsString()
  @IsNotEmpty()
  apellidos: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  rol: Roles;
}
