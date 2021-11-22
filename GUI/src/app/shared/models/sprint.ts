import { Project } from "./project";
import { Userstories } from "./userstories";

export interface Sprint {
    
    proyecto: Project;
    userstories: Userstories;
    fecha_inicio: Date;
    estado: Boolean;
    _id: String;
    
}

export class Sprint implements Sprint {
  constructor(estado?: Boolean,
              proyecto?: Project,
              userstories?: Userstories,
              fecha_inicio?: Date,
              _id?: string,
             
  ) {
    if   (estado != null) {
        this.estado = estado;
    }
    if (typeof _id === 'string') {
      this._id = _id;
  }
      if (fecha_inicio != null) {
          this.fecha_inicio = fecha_inicio;
        }
        if (userstories != null) {
          this.userstories = userstories;
      }
      
      if (proyecto != null) {
        this.proyecto = proyecto;
    }
    
      
  }
}