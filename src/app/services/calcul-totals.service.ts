import { Injectable } from '@angular/core';
import { Servei } from '../models/servei';
import { ServeiWeb } from '../models/serveiWeb';
import { Pressupost } from '../models/pressupost';

@Injectable({
  providedIn: 'root',
})
export class CalculTotalsService {
  serveis: Servei[] = [];
  pressupost:Pressupost = {
    nom:'',
    client:'',
    serveis:this.serveis
  }
  pressupostosList:Pressupost[]=[];
  pagines: number = 0;
  idiomes: number = 0;
  totalServeis: number = 0;

  web: ServeiWeb = {
    nom: 'web',
    preu: 500,
    pagines: 0,
    idiomes: 0,
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
    console.log(this.serveis);
  }

  resetServeiWeb() {
    this.web.preu = 500;
    this.web.pagines = 0;
    this.web.pagines = 0;
  }

  creaPressupost(nom:string,client:string){
    this.pressupost.nom=nom;
    this.pressupost.client=client;
    this.pressupost.serveis = this.serveis
  }

  addPressupost(){
    this.pressupostosList.push(this.pressupost) 
    console.log(this.pressupostosList);
  }

  resetServices(){
    this.resetServeiWeb();
    this.serveis=[];
    this.totalServeis=0;
  }
}
