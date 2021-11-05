import { Component, OnInit } from '@angular/core';
import { CalculTotalsService } from '../services/calcul-totals.service';
import { FormControl,FormGroup } from '@angular/forms';
import { Servei } from '../models/servei';
import { ServeiWeb } from '../models/serveiWeb';
import { trigger, state, style, animate, transition} from '@angular/animations'

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

  saveData= new FormGroup({
    clientForm: new FormControl(''),
    nomPressuposForm: new FormControl('')

  })
  webCheckboxFlag: boolean = false;
  seoCheckboxFlag: boolean = false;
  adsCheckboxFlag: boolean = false;

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

  total = 0;
  constructor(private operativaServeis: CalculTotalsService) {}

  ngOnInit(): void {}

  webSelected() {
    this.webCheckboxFlag = !this.webCheckboxFlag;
    if (this.webCheckboxFlag === true) {
      this.operativaServeis.addServei(this.web);
    } else {
      this.operativaServeis.removeServei(this.operativaServeis.web);
      this.operativaServeis.pagines = 0;
      this.operativaServeis.idiomes = 0;
    }
  }
  seoSelected() {
    this.seoCheckboxFlag = !this.seoCheckboxFlag;
    this.seoCheckboxFlag === true
      ? this.operativaServeis.addServei(this.seo)
      : this.operativaServeis.removeServei(this.seo);
  }
  adsSelected() {
    this.adsCheckboxFlag = !this.adsCheckboxFlag;
    this.adsCheckboxFlag === true
      ? this.operativaServeis.addServei(this.ads)
      : this.operativaServeis.removeServei(this.ads);
  }

  getTotal(): void {
    this.operativaServeis.calculTotal();
    this.total = this.operativaServeis.totalServeis;
  }

  updateTotal(newTotal: number) {
    this.total = newTotal;
  }
}
