import { Injectable } from '@nestjs/common';
import { Usuarios, Roles } from './auth.model';
import { LoginDTO } from './DTO/LoginDTO';
import { RegistroDTO } from './DTO/RegistroDTO';

@Injectable()
export class AuthService {
  private db: Usuarios[] = [
    {
      id: 1,
      nombres: 'juan camilo',
      apellidos: 'cardona murillos',
      email: 'jcardona@mail.com',
      password: 'ejemplo',
      rol: Roles.estudiante,
    },
  ];

  login(user: LoginDTO) {
    const usuario = this.db.find((usuario) => usuario.email === user.email);

    if (!usuario) {
      return { error: 'usuario no encontrado' };
    }

    if (user.email === usuario.email && user.password === usuario.password) {
      return { ok: 'login exitoso' };
    } else {
      return { error: 'error al iniciar sesion' };
    }
  }

  registro(user: RegistroDTO) {
    const newUser = {
      id: this.db.length + 1,
      ...user,
    };

    this.db.push(newUser);

    return { ok: 'usuario registrado exitosamente' };
  }

  getUsers() {
    return this.db;
  }
}
