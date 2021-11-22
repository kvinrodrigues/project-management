export interface Project {
    estado?: boolean;
    usuarios?: string[];
    nombre_proyecto?: string;
    descripcion?: string;
    uid?: string;
}

export class Project implements Project {
    constructor(nombre_proyecto?: string,
                descripcion?: string,
                usuarios?: string[],
                uid?: string
    ) {
        if (typeof uid === "string") {
            this.uid = uid;
        }
        if (nombre_proyecto != null) {
            this.nombre_proyecto = nombre_proyecto;
        }
        if (descripcion != null) {
            this.descripcion = descripcion;
        }
        this.usuarios = usuarios;
    }
}
