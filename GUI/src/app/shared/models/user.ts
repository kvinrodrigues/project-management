export interface User {
      estado: boolean;
      nombre: string;
      correo: string;
      rol: string;
      uid: string;
  }

  export class User implements User {
    constructor(nombre?: string,
                correo?: string,
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
    }
}