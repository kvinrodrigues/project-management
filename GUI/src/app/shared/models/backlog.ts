import {Userstories} from "./userstories";

export interface Backlog {
    userstories: Userstories[];
    nombre: string;
    _id: string;
    estado: Boolean;
}

export class Backlog implements Backlog {
    constructor(nombre?: string,
                userstories?: Userstories[],
                _id?: string,
                estado?: Boolean
    ) {
        if (estado != null) {
            this.estado = estado;
        }
        if (typeof _id === "string") {
            this._id = _id;
        }
        if (nombre != null) {
            this.nombre = nombre;
        }
        if (userstories != null) {
            this.userstories = userstories;
        }
    }
}
