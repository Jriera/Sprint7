import { Component, Input, OnInit, Output,EventEmitter,ElementRef,ViewChild } from '@angular/core';

import { ServeiWeb } from '../models/serveiWeb';
import { CalculTotalsService } from '../services/calcul-totals.service';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.css']
})
export class PanellComponent implements OnInit {
  
pagines:number =0;
idiomes:number =0;
@ViewChild('inpagines') inpagines?:ElementRef;
@Output() totalEmitter:EventEmitter<number> = new EventEmitter()
  constructor(private idiomesPagines:CalculTotalsService) { }

  ngOnInit(): void {
  }
  
setPagines(e:number){
  this.pagines=e;
  this.idiomesPagines.getPagines(this.pagines);
  
}
setIdiomes(e:number){
  this.idiomes=e;
  this.idiomesPagines.getIdiomes(this.idiomes);
 
}
actualitza(){
  this.idiomesPagines.removeServei(this.idiomesPagines.web);
  this.idiomesPagines.updateServeiWeb();
}

totalEmision(){
  this.idiomesPagines.calculTotal();
  this.totalEmitter.emit(this.idiomesPagines.totalServeis)
  console.log('emitter called')
}

addPage(){
 this.inpagines?.nativeElement.value+1
}
}
