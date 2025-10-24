import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './DTO/LoginDTO';
import { RegistroDTO } from './DTO/RegistroDTO';

@Controller('auth')
export class AuthController {
  constructor(private authSrv: AuthService) {}

  @Post('login')
  login(@Body() user: LoginDTO) {
    return this.authSrv.login(user);
  }

  @Post('registro')
  registro(@Body() user: RegistroDTO) {
    return this.authSrv.registro(user);
  }

  @Get()
  users() {
    return this.authSrv.getUsers();
  }
}
