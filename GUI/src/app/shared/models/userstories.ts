import { Project } from "./project";

export interface Userstories {
    estado: boolean;    
    uid: string;
    titulo: string;
    solicitante: string;
    descripcion: string;
    proyecto: Project;

}

export class Userstories implements Userstories {
  constructor(estado?: boolean,
              uid?: string,
              titulo?: string,
              solicitante?: string,
              descripcion?: string,
              proyecto?: Project
  ) {
      if (typeof uid === 'string' ) {
          this.uid = uid;
      }
    
    if (titulo != null) {
        this.titulo = titulo;
    }

    if (solicitante != null) {
        this.solicitante = this.solicitante;
    }

    if (descripcion != null) {
        this.descripcion = this.descripcion;
    }
    
      if (proyecto != null) {
          this.proyecto = proyecto;
      }

      if (estado != null) {
        this.estado = estado;
    }
      
  }
}