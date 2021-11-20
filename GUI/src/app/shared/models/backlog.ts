export interface Backlog {
    estado: boolean;
    backlog: string;
    uid: string;
    
}

export class Backlog implements Backlog {
  constructor(proyecto?: string,
              uid?: string
             
  ) {
      if (typeof uid === "string") {
      this.uid = uid;
     }
      if (proyecto != null) {
          this.backlog = proyecto;
      }
    
      
  }
}