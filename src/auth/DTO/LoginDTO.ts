import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
