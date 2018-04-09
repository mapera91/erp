import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-listado-prov',
  templateUrl: './listado-prov.component.html',
  styleUrls: ['./listado-prov.component.css']
})
export class ListadoProvComponent implements OnInit {

  proveedores:any;

  constructor(private proveedoresService:ProveedoresService) { }

  ngOnInit() {
    this.cargarProveedores(); //Cuando se carga el componente se ejecuta cargarProveedores
  }

  cargarProveedores() {
    this.proveedoresService.getProveedores().subscribe((resp:any)=> { //subscribe para recojer los datos
      this.proveedores = resp.proveedores;
      console.log(this.proveedores);
    },error=> {
      console.log(error);
    }) 
  }

}
