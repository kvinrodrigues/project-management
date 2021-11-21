export interface Rol {
    rol?: string;
    descripcion?: string;
    permisos?: String[]; // Se envian los identificadores
    uid?: string;
    estado?: boolean;
}

export class Rol implements Rol {
    constructor(
        rol?: string,
        descripcion?: string,
        permisos?: String[],
        estado?: boolean,
        uid?: string,
    ) {
        this.rol = rol;
        this.descripcion = descripcion;
        this.uid = uid;
        this.permisos = permisos;
        this.estado = estado;
    }
}
