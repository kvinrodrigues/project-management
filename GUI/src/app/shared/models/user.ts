import {Rol} from "./rol";

export interface User {
      estado: boolean;
      nombre: string;
      correo: string;
      rol: Rol;
      uid: string;
  }

  export class User implements User {
    constructor(nombre?: string,
                correo?: string,
                rol?: Rol,
                uid?: string
    ) {
        if (typeof uid === "string") {
            this.uid = uid;
        }
        if (nombre != null) {
            this.nombre = nombre;
        }
        if (correo != null) {
            this.correo = correo;
        }
        if (rol != null) {
            this.rol = rol;
        }
    }
}
