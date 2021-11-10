import { Component, OnInit } from '@angular/core';
import { CalculTotalsService } from '../services/calcul-totals.service';
import { FormControl,FormGroup } from '@angular/forms';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';




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
  constructor(private operativaServeis: CalculTotalsService,private activateRoute:ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      console.log(params);
      
      if(params.seo==='true'){
        if(this.operativaServeis.serveis.includes(this.operativaServeis.seo)){
        }else{
        console.log(typeof(params.seo));
        this.seoCheckboxFlag=params.seo;
        this.operativaServeis.addServei(this.operativaServeis.seo)
        console.log(this.operativaServeis.serveis)
        this.getTotal();
        }
        
      }
      if(params.ads=== 'true'){
        if(this.operativaServeis.serveis.includes(this.operativaServeis.ads)){
        }else{
        this.adsCheckboxFlag=params.ads;
        this.operativaServeis.addServei(this.operativaServeis.ads)
        this.getTotal();
        }
      }
      if(params.web=== 'true'){
        if(this.operativaServeis.serveis.includes(this.operativaServeis.web)){
        }else{
        this.webCheckboxFlag=true;
        this.operativaServeis.web.preu=500;
        this.operativaServeis.addServei(this.operativaServeis.web);
        this.operativaServeis.calculPreuWeb(this.operativaServeis.web);
        this.getTotal();
        }
      }
    })
  }

  webSelected() {
    this.webCheckboxFlag = !this.webCheckboxFlag;
    if (this.webCheckboxFlag === true) {
      this.operativaServeis.web.preu=500;
      this.operativaServeis.addServei(this.operativaServeis.web);
      this.afegeixParams();
    } else {
      this.operativaServeis.removeServei(this.operativaServeis.web);
      this.afegeixParams();
      
      
    }
  }
  seoSelected() {
    this.seoCheckboxFlag = !this.seoCheckboxFlag;
    this.seoCheckboxFlag === true
      ? this.operativaServeis.addServei(this.operativaServeis.seo)
      : this.operativaServeis.removeServei(this.operativaServeis.seo);
      this.afegeixParams();
  }
  adsSelected() {
    this.adsCheckboxFlag = !this.adsCheckboxFlag;
    this.adsCheckboxFlag === true
      ? this.operativaServeis.addServei(this.operativaServeis.ads)
      : this.operativaServeis.removeServei(this.operativaServeis.ads);
      this.afegeixParams();
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

  afegeixParams(){
    this.router.navigate([], {
      queryParams: {
        web: this.webCheckboxFlag,
        seo: this.seoCheckboxFlag,
        ads: this.adsCheckboxFlag
      },
        queryParamsHandling:'merge'
    })
  }

}
