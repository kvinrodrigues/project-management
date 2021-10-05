export interface Rol {
    rol?: string;
    descripcion?: string;
    uid?: string;
    estado?: boolean;
}

export class Rol implements Rol {
    constructor(
        rol?: string,
        descripcion?: string,
        estado?: boolean,
        uid?: string,
    ) {
        this.rol = rol;
        this.descripcion = descripcion;
        this.uid = uid;
        this.estado = estado;
    }
}
