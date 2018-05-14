import { Component, OnInit } from '@angular/core';
import { ArticulosService } from '../../servicios/articulos.service';

@Component({
  selector: 'app-listado-arti',
  templateUrl: './listado-arti.component.html',
  styleUrls: ['./listado-arti.component.css']
})
export class ListadoArtiComponent implements OnInit {

  articulos:any

  constructor(private articulosService:ArticulosService) { }

  ngOnInit() {
    this.cargarArticulos();
  }

  cargarArticulos() {
    this.articulosService.getArticulos().subscribe((resp:any)=> {
      this.articulos = resp.articulos;
    },(error)=> {
      console.log(error);
    })
  }

}
