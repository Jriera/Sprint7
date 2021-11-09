import { Component, OnInit } from '@angular/core';
import { CalculTotalsService } from '../services/calcul-totals.service';
import { FormControl,FormGroup } from '@angular/forms';
import { trigger, state, style, animate, transition} from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('inOutPaneAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50%)' }), 
        animate(
          '750ms ease-in-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }), 
        animate(
          '600ms ease-in-out',
          style({ opacity: 0, transform: 'translateX(-50%)' })
        ),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit {

  saveData= new FormGroup({//TODO: afegir validació de camps
    clientForm: new FormControl(''),
    nomForm: new FormControl('')

  })
  webCheckboxFlag: boolean = false;
  seoCheckboxFlag: boolean = false;
  adsCheckboxFlag: boolean = false;

  

  total = 0;
  constructor(private operativaServeis: CalculTotalsService) {}

  ngOnInit(): void {}

  webSelected() {
    this.webCheckboxFlag = !this.webCheckboxFlag;
    if (this.webCheckboxFlag === true) {
      this.operativaServeis.web.preu=500;
      this.operativaServeis.addServei(this.operativaServeis.web);
    } else {
      this.operativaServeis.removeServei(this.operativaServeis.web);
      
      
    }
  }
  seoSelected() {
    this.seoCheckboxFlag = !this.seoCheckboxFlag;
    this.seoCheckboxFlag === true
      ? this.operativaServeis.addServei(this.operativaServeis.seo)
      : this.operativaServeis.removeServei(this.operativaServeis.seo);
  }
  adsSelected() {
    this.adsCheckboxFlag = !this.adsCheckboxFlag;
    this.adsCheckboxFlag === true
      ? this.operativaServeis.addServei(this.operativaServeis.ads)
      : this.operativaServeis.removeServei(this.operativaServeis.ads);
  }

  getTotal(): void {
    this.operativaServeis.calculTotal();
    this.total = this.operativaServeis.totalServeis;
  }

  updateTotal(newTotal: number) {
    this.total = newTotal;
    
    
  }

  resetCheckboxes(){
    this.webCheckboxFlag=false;
    this.seoCheckboxFlag=false;
    this.adsCheckboxFlag=false;
  }

  /* Per si fos necessari incloure funcionalitat localStorage
  setLocalStorageData(){
    localStorage.setItem('pressupostos', JSON.stringify(this.operativaServeis.pressupostosList));
    console.log(localStorage.getItem('pressupostos'));
    
  } */

  
  desaPressupost(){ //TODO disabled button desa pressupost si no hi ha cap servei seleccionat i reset formulari de pressupost
   
    this.operativaServeis.pressupost.nom=this.saveData.value.nomForm;
    this.operativaServeis.pressupost.client=this.saveData.value.clientForm;
    this.operativaServeis.addPressupost();
    this.resetCheckboxes();
    this.operativaServeis.resetServices();
    this.getTotal()
    /* this.setLocalStorageData(); */
  }


}
