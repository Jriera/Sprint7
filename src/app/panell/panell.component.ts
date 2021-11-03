import { Component, Input, OnInit } from '@angular/core';
import { ServeiWeb } from '../models/serveiWeb';
import { CalculTotalsService } from '../services/calcul-totals.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.css']
})
export class PanellComponent implements OnInit {
  @Input() passedWeb!:ServeiWeb;
  paginesForm = new FormControl('');
  idiomesForm = new FormControl('');
pagines:number =0;
idiomes:number =0
  constructor(private idiomesPagines:CalculTotalsService) { }

  ngOnInit(): void {
    this.paginesForm.setValue(0);
    this.idiomesForm.setValue(0);


  }
setPagines(){
  this.idiomesPagines.getPagines(this.pagines);
}
setIdiomes(){
  this.idiomesPagines.getIdiomes(this.idiomes);
}

addPagina(){
  this.paginesForm.setValue(this.paginesForm.value+1)

}

subsPagina(){
  this.paginesForm.setValue(this.paginesForm.value-1)
}

addIdioma(){
  this.idiomesForm.setValue(this.idiomesForm.value+1)
}

subsIdioma(){
  this.idiomesForm.setValue(this.idiomesForm.value-1)
}


}
