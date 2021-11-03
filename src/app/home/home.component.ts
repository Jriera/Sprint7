import { Component, OnInit } from '@angular/core';
import { CalculTotalsService } from '../services/calcul-totals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  webCheckboxFlag:boolean=false
  seoCheckboxFlag:boolean=false
  adsCheckboxFlag:boolean=false
pagines:number=0;
  
  total=0;
  constructor(private operativaServeis:CalculTotalsService) { 
    this.pagines=operativaServeis.pagines;
  }
  
  ngOnInit(): void {
  }
  

webSelected(){
  this.webCheckboxFlag=!this.webCheckboxFlag;
  if(this.webCheckboxFlag===true){
    this.operativaServeis.addServei(this.operativaServeis.web)
  }
  else{
    this.operativaServeis.getIdiomes(0);
    this.operativaServeis.getPagines(0);
    this.operativaServeis.web.preu=500;
    this.operativaServeis.removeServei(this.operativaServeis.web);
    
    
    
  }
  console.log(this.operativaServeis.serveis)
  
}
seoSelected(){
  this.seoCheckboxFlag=!this.seoCheckboxFlag;
  this.seoCheckboxFlag===true?this.operativaServeis.addServei(this.operativaServeis.seo):this.operativaServeis.removeServei(this.operativaServeis.seo)
 
}
adsSelected(){
  this.adsCheckboxFlag=!this.adsCheckboxFlag;
  this.adsCheckboxFlag===true?this.operativaServeis.addServei(this.operativaServeis.ads):this.operativaServeis.removeServei(this.operativaServeis.ads)
 
}

getTotal():void{
  this.operativaServeis.calculTotal();
  this.total=this.operativaServeis.totalServeis;
  
}
updateTotal(newTotal:number){
this.total=newTotal;
}


}
