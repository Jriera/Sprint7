import { Servei } from "./servei";

export class Pressupost{
    nom:string;
    client:string;
    serveis:Servei[];
    preu:number;
    data:String;

    constructor(nom:string, client:string, serveis:Servei[], preu:number, data:String){
        this.nom = nom;
        this.client = client;
        this.serveis = serveis;
        this.preu = preu;
        this.data = data;
    }
}

