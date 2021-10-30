import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  webCheckboxFlag:boolean=false
  seoCheckboxFlag:boolean=false
  adsCheckboxFlag:boolean=false
  web:number=0
  seo:number=0
  ads:number=0
  total=0;
  constructor() { }

  ngOnInit(): void {
  }
  

webSelected(){
  this.webCheckboxFlag=!this.webCheckboxFlag;
  (this.webCheckboxFlag===true?this.web=500:this.web=0);
}
seoSelected(){
  this.seoCheckboxFlag=!this.seoCheckboxFlag;
  (this.seoCheckboxFlag===true?this.seo=300:this.seo=0);
}
adsSelected(){
  this.adsCheckboxFlag=!this.adsCheckboxFlag;
  (this.adsCheckboxFlag===true?this.ads=200:this.ads=0);
}
getTotal(){
  this.total=this.web+this.seo+this.ads;
 
}

}
