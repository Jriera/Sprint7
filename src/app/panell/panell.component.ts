
import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServeiWeb } from '../models/serveiWeb';
import { CalculTotalsService } from '../services/calcul-totals.service';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

import {TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.css']
})
export class PanellComponent implements OnInit {

  @Input() passedWeb!:ServeiWeb;
  @Output() totalEmitter:EventEmitter<number> = new EventEmitter()
  regex = new RegExp(/^[0-9]*$/);
  extrasWeb = new FormGroup({
    paginesForm: new FormControl('',[Validators.required,Validators.min(0),Validators.pattern(this.regex)]),
    idiomesForm:new FormControl('',[Validators.required,Validators.min(0),Validators.pattern(this.regex)])
  });

  
pagines:number =0;
idiomes:number =0;

positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
position = new FormControl(this.positionOptions[3]);

constructor(private idiomesPagines:CalculTotalsService, private activateRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.extrasWeb.setValue({paginesForm:0,idiomesForm:0});
    this.onChanges();
    
        
        this.extrasWeb.setValue({
          paginesForm:Number(this.activateRoute.snapshot.queryParamMap.get('pagines')),
          idiomesForm:Number(this.activateRoute.snapshot.queryParamMap.get('idiomes'))
        })
     
   
    


  }

  afegeixParams(){
    this.router.navigate([],
      {
        relativeTo: this.activateRoute,
        queryParams:{
          pagines:this.extrasWeb.value.paginesForm,
          idiomes:this.extrasWeb.value.idiomesForm
        },
        queryParamsHandling:'merge'
      });
  }

setPagines(){
  this.idiomesPagines.getPagines(this.extrasWeb.value.paginesForm);
}
setIdiomes(){
  this.idiomesPagines.getIdiomes(this.extrasWeb.value.idiomesForm);
}

addPagina(){
  this.extrasWeb.setValue({paginesForm:this.extrasWeb.value.paginesForm+1,idiomesForm:this.extrasWeb.value.idiomesForm})
  this.afegeixParams();
  console.log(this.idiomesPagines.serveis)

}

subsPagina(){
  this.extrasWeb.setValue({paginesForm:this.extrasWeb.value.paginesForm-1,idiomesForm:this.extrasWeb.value.idiomesForm})
  this.afegeixParams();
}

addIdioma(){
  this.extrasWeb.setValue({paginesForm:this.extrasWeb.value.paginesForm,idiomesForm:this.extrasWeb.value.idiomesForm+1})
  this.afegeixParams();
}

subsIdioma(){
  this.extrasWeb.setValue({paginesForm:this.extrasWeb.value.paginesForm,idiomesForm:this.extrasWeb.value.idiomesForm-1})
  this.afegeixParams();
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
  this.totalEmitter.emit(this.idiomesPagines.totalServeis);
  
  
  
})
}


}
