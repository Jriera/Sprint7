import { Component, OnInit } from '@angular/core';
import { CalculTotalsService } from '../services/calcul-totals.service';
import { Servei } from '../models/servei';
import { ServeiWeb } from '../models/serveiWeb';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

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
    this.webCheckboxFlag === true
      ? this.operativaServeis.addServei(this.web)
      : this.operativaServeis.removeServei(this.web);
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
