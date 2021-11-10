import { Component, OnInit } from '@angular/core';
import { CalculTotalsService } from '../services/calcul-totals.service';
import { Pressupost } from '../models/pressupost';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-pressupost-list',
  templateUrl: './pressupost-list.component.html',
  styleUrls: ['./pressupost-list.component.css']
})
export class PressupostListComponent implements OnInit {
  cercaForm = new FormControl('');
  pressupostos:Pressupost[]=[];
  cercaResultat:Pressupost[]=[];
  taulaAlfabetica:Pressupost[]=[];
  taulaData:Pressupost[]=[];
  taulaPreu:Pressupost[]=[];
  alphabetic:boolean=false;
  ordreNormal:boolean=true;
  ordreData:Boolean=false;
  ordrePreu:boolean=false;
  cerca:boolean=false;
  constructor(private operativaServeis:CalculTotalsService) { }

  ngOnInit(): void {
    this.pressupostos=this.operativaServeis.pressupostosList;
    this.cercaUpdate();    
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
  this.taulaAlfabetica=this.pressupostos.map(p=>p).sort((a,b)=>{ //?El map es una copia de la llista per evitar que es modifiqui la llista original
    if(a.nom<b.nom) return -1;
    if(a.nom>b.nom) return 1;
    return 0;
  })
  this.ordreNormal=false;
  this.ordreData=false;
  this.ordrePreu=false;
  this.alphabetic=true;
  this.cerca=false;
}

llistaData(){
  this.taulaData=this.pressupostos.map(p=>p).sort((a,b)=>{ //?El map es una copia de la llista per evitar que es modifiqui la llista original
    if(a.data<b.data) return -1;
    if(a.data>b.data) return 1;
    return 0;
  })
  this.ordreNormal=false;
  this.ordreData=true;
  this.ordrePreu=false;
  this.alphabetic=false;
  this.cerca=false;
}

llistaPreu(){
  this.taulaPreu=this.pressupostos.map(p=>p).sort((a,b)=>{ //?El map es una copia de la llista per evitar que es modifiqui la llista original
    if(a.preu<b.preu) return -1;
    if(a.preu>b.preu) return 1;
    return 0;
  })
  this.ordreNormal=false;
  this.ordreData=false;
  this.ordrePreu=true;
  this.alphabetic=false;
  this.cerca=false;
}

resetOrdre(){
  this.ordreNormal=true;
  this.ordreData=false;
  this.ordrePreu=false;
  this.alphabetic=false;
  this.cerca=false;
}

cercaUpdate():void{
  
  this.cercaForm.valueChanges.subscribe(value=>{
    this.cercaResultat=this.pressupostos.map(p=>p).filter(p=>p.nom.toLowerCase().includes(value.toLowerCase()))
    this.ordreNormal=false;
    this.cercaResultat.length>0?this.cerca=true:this.cerca=false;

  })
}


}
