
import { Component, Input, OnInit, Output } from '@angular/core';

import { ServeiWeb } from '../models/serveiWeb';
import { CalculTotalsService } from '../services/calcul-totals.service';
import { FormControl,FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.css']
})
export class PanellComponent implements OnInit {

  @Input() passedWeb!:ServeiWeb;
  @Output() totalEmitter:EventEmitter<number> = new EventEmitter()
  extrasWeb = new FormGroup({
    paginesForm: new FormControl(''),
    idiomesForm:new FormControl('')
  });

  
pagines:number =0;
idiomes:number =0;
@ViewChild('inpagines') inpagines?:ElementRef;
@Output() totalEmitter:EventEmitter<number> = new EventEmitter()
  constructor(private idiomesPagines:CalculTotalsService) { }

  ngOnInit(): void {
    this.extrasWeb.setValue({paginesForm:0,idiomesForm:0});
    this.onChanges();
    


  }

setPagines(){
  this.idiomesPagines.getPagines(this.extrasWeb.value.paginesForm);
}
setIdiomes(){
  this.idiomesPagines.getIdiomes(this.extrasWeb.value.idiomesForm);
}

addPagina(){
  this.extrasWeb.setValue({paginesForm:this.extrasWeb.value.paginesForm+1,idiomesForm:this.extrasWeb.value.idiomesForm})

}

subsPagina(){
  this.extrasWeb.setValue({paginesForm:this.extrasWeb.value.paginesForm-1,idiomesForm:this.extrasWeb.value.idiomesForm})
}

addIdioma(){
  this.extrasWeb.setValue({paginesForm:this.extrasWeb.value.paginesForm,idiomesForm:this.extrasWeb.value.idiomesForm+1})
}

subsIdioma(){
  this.extrasWeb.setValue({paginesForm:this.extrasWeb.value.paginesForm,idiomesForm:this.extrasWeb.value.idiomesForm-1})
}

actualitza(){
  this.idiomesPagines.removeServei(this.idiomesPagines.web);
  this.idiomesPagines.updateServeiWeb();
}

onChanges():void {
this.extrasWeb.valueChanges.subscribe(val=>{
  this.idiomesPagines.getPagines(val.paginesForm)
  this.idiomesPagines.getIdiomes(val.idiomesForm)
  this.actualitza()
  this.idiomesPagines.calculTotal();
  this.totalEmitter.emit(this.idiomesPagines.totalServeis)
  console.log(this.idiomesPagines.totalServeis)
  console.log('total emitted');
  
})
}


}
