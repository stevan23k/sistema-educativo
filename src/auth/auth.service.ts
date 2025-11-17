import { Injectable } from '@nestjs/common';
import { Usuarios, Roles } from './auth.model';
import { LoginDTO } from './DTO/LoginDTO';
import { RegistroDTO } from './DTO/RegistroDTO';
import { hashSync, compareSync } from 'bcrypt';
import { HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}
  private db: Usuarios[] = [
    {
      id: 1,
      nombres: 'juan camilo',
      apellidos: 'cardona murillos',
      email: 'jcardona@mail.com',
      password: '$2b$10$vkeENHDS/aU0q7239YffL.Oq6OTmiuHeWaQQrM24jJxgGNHE9HMce',
      rol: Roles.estudiante,
    },
  ];

  async login(user: LoginDTO) {
    const usuario = this.db.find((usuario) => usuario.email === user.email);

    if (!usuario) {
      throw new HttpException('Usuario no encontrado', 404);
    }

    const password = compareSync(user.password, usuario.password);
    if (!password) {
      throw new HttpException('Contraseña incorrecta', 401);
    }

    const payload = {
      id: usuario.id,
      nombres: usuario.nombres,
      email: usuario.email,
      rol: usuario.rol,
    };

    return { token: await this.jwt.signAsync(payload) };
  }

  registro(user: RegistroDTO) {
    const passwordEncrypted = hashSync(user.password, 10);
    const newUser = {
      id: this.db.length + 1,
      ...user,
      password: passwordEncrypted,
    };

    this.db.push(newUser);

    return { ok: 'usuario registrado exitosamente', newUser };
  }

  getUsers() {
    return this.db;
  }
}
