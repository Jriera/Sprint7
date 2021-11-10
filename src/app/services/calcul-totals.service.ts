import { Injectable } from '@angular/core';
import { Servei } from '../models/servei';
import { ServeiWeb } from '../models/serveiWeb';
import { Pressupost } from '../models/pressupost';


@Injectable({
  providedIn: 'root',
})
export class CalculTotalsService {
  serveis: Servei[] = [];
  
  pagines: number = 0;
  idiomes: number = 0;
  totalServeis: number = 0;

  pressupost:Pressupost = {
    nom:'',
    client:'',
    serveis:this.serveis,
    preu:this.totalServeis,
    data:this.getCurrentDate()
  }

  pressupostosList:Pressupost[]=[];


  web: ServeiWeb = {
    nom: 'web',
    preu: 500,
    pagines: 0,
    idiomes: 0
  };

  seo: Servei = {
    nom: 'seo',
    preu: 300,
  };

  ads: Servei = {
    nom: 'ads',
    preu: 200,
  };

  constructor() {}

  addServei(servei: Servei): void {
    this.serveis.push(servei);
    
  }

  removeServei(servei: Servei): void {
    const index: number = this.serveis.indexOf(servei);
    this.serveis.splice(index, 1);
  }

  calculTotal() {
    this.totalServeis = this.serveis
      .map((servei) => servei.preu)
      .reduce((total, s) => (total = total + s), 0);
  }

  calculPreuWeb(web: ServeiWeb) {
    const preuWebInicial = 500;
    web.preu = preuWebInicial + web.pagines * web.idiomes * 30;
  }

  getPagines(pagines: number): void {
    this.pagines = pagines;
  }
  getIdiomes(idiomes: number): void {
    this.idiomes = idiomes;
  }

  updateServeiWeb() {
    this.web.pagines = this.pagines;
    this.web.idiomes = this.idiomes;
    this.calculPreuWeb(this.web);
    this.addServei(this.web);

    
    
  }

 
  

  addPressupost(){
    this.pressupost.serveis = [];
    
    this.serveis.forEach(val => this.pressupost.serveis.push(Object.assign({}, val)));
   //necessari per crear un nou array independent del que tingui el servei i evitar que els serveis del pressupost segueixin canviant


    const pressupost = new Pressupost(this.pressupost.nom,this.pressupost.client,this.pressupost.serveis,this.totalServeis,this.getCurrentDate());
    this.pressupostosList.push(pressupost) 
    console.log(this.pressupostosList);
   
  }

  resetServices(){
   
    this.serveis=[];
    this.totalServeis=0;
  }

  getCurrentDate(){
    const currentDate = new Date();
    return currentDate.toISOString().split('.')[0];
    
    
  }

  
}
