export interface Permission {
    nombre_permiso: string;
    descripcion: string;
    uid: string;
}

export class Permission implements Permission {
    constructor(nombre_permiso?: string,
                descripcion?: string,
                uid?: string
    ) {
        if (typeof uid === "string") {
            this.uid = uid;
        }
        if (nombre_permiso != null) {
            this.nombre_permiso = nombre_permiso;
        }
        if (descripcion != null) {
            this.descripcion = descripcion;
        }
    }
}
