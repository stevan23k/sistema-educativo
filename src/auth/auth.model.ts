export enum Roles {
  administrador = 'administrador',
  estudiante = 'estudiante',
  profesor = 'profesor',
}

export interface Usuarios {
  id?: number;
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  rol: Roles;
}
