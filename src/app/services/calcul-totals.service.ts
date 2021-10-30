import { Injectable } from '@angular/core';
import { Servei } from '../models/servei';
import { ServeiWeb } from '../models/serveiWeb';

@Injectable({
  providedIn: 'root'
})
export class CalculTotalsService {
serveis:Servei[]=[];
totalServeis:number=0;
  constructor() { }

  addServei(servei:Servei):void{
  this.serveis.push(servei);
  }

  removeServei(servei:Servei):void{
    const index:number=this.serveis.indexOf(servei)
    const newServeis:Servei[]=this.serveis.splice(index,1);
    this.serveis=newServeis;
  }

  calculTotal(){
   this.totalServeis= this.serveis.map(servei=>servei.preu)
            .reduce((total,s)=>total=total+s,0)
  }

  calculPreuWeb(web:ServeiWeb){
    web.preu=web.preu + (web.pagines*web.idiomes*30)
  }


}


