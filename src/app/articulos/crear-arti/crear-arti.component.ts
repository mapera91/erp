import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ArticulosService } from '../../servicios/articulos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-arti',
  templateUrl: './crear-arti.component.html',
  styleUrls: ['./crear-arti.component.css']
})
export class CrearArtiComponent implements OnInit {

  articuloForm:FormGroup;
  articulo:any;

  constructor(private af:FormBuilder,
              private articulosService:ArticulosService,
              private router:Router) { }

  ngOnInit() {
    this.articuloForm = this.af.group({
      referencia:null,
      nombre:null,
      precio:null
    })
  }

  crearArti() {
    this.articulo = this.guardarArticulo();
    this.articulosService.postArticulo(this.articulo).subscribe((resp:any)=> {
      this.router.navigate(['listado-articulos']);
    },(error)=> {
      console.log(error);
    })
  }

  guardarArticulo() {
    const guardarArticulo = {
      referencia:this.articuloForm.get('referencia').value,
      nombre:this.articuloForm.get('nombre').value,
      precio:this.articuloForm.get('precio').value,
    }
    return guardarArticulo;
  }

}
