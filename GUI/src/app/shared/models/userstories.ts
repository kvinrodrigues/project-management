export interface Userstories {
    estado: boolean;
    proyecto: string;
    uid: string;
}

export class Userstories implements Userstories {
  constructor(proyecto?: string,
              uid?: string
  ) {
      if (typeof uid === "string") {
          this.uid = uid;
      }
      if (proyecto != null) {
          this.proyecto = proyecto;
      }
      
  }
}