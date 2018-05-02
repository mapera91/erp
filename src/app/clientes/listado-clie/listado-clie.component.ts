import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ClientesService } from '../../servicios/clientes.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-listado-clie',
  templateUrl: './listado-clie.component.html',
  styleUrls: ['./listado-clie.component.css'],
  animations: [
    trigger('alerta',[state('show',style({opacity:1})),state('hide',style({opacity:0})),transition('show => hide',animate('500ms ease-out')),transition('hide => show',animate('500ms ease-in'))])
  ]
})
export class ListadoClieComponent implements OnInit {

  buscador:FormControl;
  clientes:any;
  mensaje:boolean;

  constructor(private clientesService:ClientesService,
              private bf:FormBuilder) { }

  ngOnInit() {
    this.buscador = new FormControl();
    this.buscador.valueChanges.subscribe(nombre=> {
      if(nombre.length != 0) {
        this.clientesService.getClientes(nombre).subscribe((resp:any)=> { //peticion
          this.clientes = resp.clientes;
          if(this.clientes.length === 0) {
            this.mensaje = true;
          } else {
            this.mensaje = false;
          }
        },(error)=> {
          console.log(error);
        })
      } else {
        this.clientes = [];
        this.mensaje = false;
      }
    })
  }

}
