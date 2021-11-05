import { Component, OnInit } from '@angular/core';
import { CalculTotalsService } from '../services/calcul-totals.service';
import { Pressupost } from '../models/pressupost';
import { Servei } from '../models/servei';

@Component({
  selector: 'app-pressupost-list',
  templateUrl: './pressupost-list.component.html',
  styleUrls: ['./pressupost-list.component.css']
})
export class PressupostListComponent implements OnInit {

  pressupostos:Pressupost[]=[]
  taulaAlfabetica:Pressupost[]=[];
  alphabetic:boolean=false;
  ordreNormal:boolean=true;
  constructor(private operativaServeis:CalculTotalsService) { }

  ngOnInit(): void {
    this.pressupostos=this.operativaServeis.pressupostosList
  }
  editarPressupost(pressupost:Pressupost){
    console.log("editarPressupost")
    //TODO editar pressupost
  }
  eliminarPressupost(pressupost:Pressupost){
    console.log("eliminarPressupost")
    const index = this.pressupostos.indexOf(pressupost);
    this.pressupostos.splice(index,1);
  }

  
ordreAlphabetic(){
  this.taulaAlfabetica=this.pressupostos.sort((a,b)=>{
    if(a.nom<b.nom) return -1;
    if(a.nom>b.nom) return 1;
    return 0;
  })
  this.ordreNormal=!this.ordreNormal;
  this.alphabetic=!this.alphabetic
}
}
