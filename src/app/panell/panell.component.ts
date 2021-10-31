import { Component, Input, OnInit } from '@angular/core';
import { ServeiWeb } from '../models/serveiWeb';
import { CalculTotalsService } from '../services/calcul-totals.service';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.css']
})
export class PanellComponent implements OnInit {
  @Input() passedWeb!:ServeiWeb;
pagines:number =0;
idiomes:number =0
  constructor(private idiomesPagines:CalculTotalsService) { }

  ngOnInit(): void {
  }
setPagines(){
  this.idiomesPagines.getPagines(this.pagines);
}
setIdiomes(){
  this.idiomesPagines.getIdiomes(this.idiomes);
}



}
