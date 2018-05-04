import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crear-arti',
  templateUrl: './crear-arti.component.html',
  styleUrls: ['./crear-arti.component.css']
})
export class CrearArtiComponent implements OnInit {

  articuloForm:FormGroup;
  articulo:any;

  constructor(private af:FormBuilder) { }

  ngOnInit() {
  }

}
