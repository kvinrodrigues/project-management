import { Userstories } from "./userstories";

export interface Backlog {
    userstories: Userstories;
    nombre: string;
    uid: string;
    estado: Boolean;
    
}

export class Backlog implements Backlog {
  constructor(estado?: Boolean,
              nombre?: string,
              uid?: string,
              userstories?: Userstories
             
  ) {
    if   (estado != null) {
        this.estado = estado;
    }
      if (typeof uid === "string") {
      this.uid = uid;
     }
      if (nombre != null) {
          this.nombre = nombre;
      }
      if (userstories != null) {
        this.userstories = userstories;
    }
    
      
  }
}