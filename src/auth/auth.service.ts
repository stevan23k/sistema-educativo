import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './DTO/LoginDTO';
import { RegistroDTO } from './DTO/RegistroDTO';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(user: LoginDTO) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: user.email },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const passwordValido = await bcrypt.compare(
      user.password,
      usuario.password,
    );

    if (!passwordValido) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = {
      id: usuario.id,
      nombres: usuario.nombres,
      email: usuario.email,
      rol: usuario.rol,
    };

    return {
      token: await this.jwt.signAsync(payload),
    };
  }

  async registro(user: RegistroDTO) {
    const existe = await this.prisma.usuario.findUnique({
      where: { email: user.email },
    });

    if (existe) {
      throw new ConflictException('Este correo ya está registrado');
    }

    const passwordEncrypted = await bcrypt.hash(user.password, 10);

    const newUser = await this.prisma.usuario.create({
      data: {
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        password: passwordEncrypted,
        rol: user.rol,
      },
    });

    return {
      ok: 'Usuario registrado exitosamente',
      newUser,
    };
  }

  async getUsers() {
    return await this.prisma.usuario.findMany();
  }
}
