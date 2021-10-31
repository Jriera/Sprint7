import { Injectable } from '@angular/core';
import { Servei } from '../models/servei';
import { ServeiWeb } from '../models/serveiWeb';

@Injectable({
  providedIn: 'root'
})
export class CalculTotalsService {
serveis:Servei[]=[];
pagines:number=0;
idiomes:number=0;
totalServeis:number=0;

  constructor() { }

  addServei(servei:Servei):void{
  this.serveis.push(servei);
  }

  removeServei(servei:Servei):void{
    const index:number=this.serveis.indexOf(servei)
    this.serveis.splice(index,1);
  }
    
    

  calculTotal(){
   this.totalServeis= this.serveis.map(servei=>servei.preu)
            .reduce((total,s)=>total=total+s,0)
  }

  calculPreuWeb(web:ServeiWeb){
    web.preu=web.preu + (web.pagines*web.idiomes*30)
  }

  getPagines(pagines:number):void{
    this.pagines=pagines;

  }
  getIdiomes(idiomes:number):void{
    this.idiomes=idiomes;

  }

  updateServeiWeb(web:ServeiWeb){
    web.pagines=this.pagines;
    web.idiomes=this.idiomes;
    this.calculPreuWeb(web);
    this.addServei(web);
  }
   


}


