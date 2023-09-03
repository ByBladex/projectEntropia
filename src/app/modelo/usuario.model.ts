import { Timestamp } from "@firebase/firestore";

export interface Usuario{
    id?:string;
    usuario?:string;
    email?:string;
    puntos?:number;
    image?:string;
    pais?:string;
    fechaRegistro?:Timestamp;
    ultimaSesion?:Timestamp;
    tiempoRecompensaDiaria?:Timestamp;
}