export interface Userstories {
    estado: boolean;
    proyecto: string;
    uid: string;
    titulo: string;
    solicitante: string;
    descripcion: string;

}

export class Userstories implements Userstories {
  constructor(proyecto?: string,
              uid?: string,
              titulo?: string,
              solicitante?: string,
              descripcion?: string
  ) {
      if (typeof uid === "string") {
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
      
  }
}