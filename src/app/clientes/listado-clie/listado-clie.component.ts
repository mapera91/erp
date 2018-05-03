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
  buscadorLocalidad:FormControl;
  buscadorLocalidadNombre:FormGroup;
  clientes:any;
  mensaje:boolean;
  buscando:boolean = false;
  verBuscadorNombre:boolean = true;
  verBuscadorLocalidad:boolean = false;
  verBuscadorLocalidadNombre:boolean = false;
  consulta:any;

  constructor(private clientesService:ClientesService,
              private bf:FormBuilder) { }

  ngOnInit() {
    this.buscador = new FormControl();
    this.buscador.valueChanges.subscribe(nombre=> {
      this.buscando = true;
      if(nombre.length != 0) {
        this.clientesService.getClientes(nombre).subscribe((resp:any)=> { //peticion
          this.buscando = false;
          this.clientes = resp.clientes;
          if(this.clientes.length === 0) {
            this.mensaje = true;
          } else {
            this.mensaje = false;
          }
        },(error)=> {
          this.buscando = false;
          console.log(error);
        })
      } else {
        this.buscando = false;
        this.clientes = [];
        this.mensaje = false;
      }
    })
    this.buscadorLocalidad = new FormControl();
    this.buscadorLocalidad.valueChanges.subscribe(localidad=> {
      this.buscando = true;
      if(localidad.length != 0) {
        this.clientesService.getClientesLocalidad(localidad).subscribe((resp:any)=> {
          this.buscando = false;
          this.clientes = resp.clientes;
          if(this.clientes.length === 0) {
            this.mensaje = true;
          } else {
            this.mensaje = false;
          }
        },(error)=> {
          this.buscando = false;
          console.log(error);
        });
      } else {
        this.buscando = false;
        this.clientes = [];
        this.mensaje = false;
      }
    })
    this.buscadorLocalidadNombre = this.bf.group({
      nombre:null,
      localidad:null
    })
  }

  crearConsulta() {
    this.mensaje = false;
    this.buscando = true;
    this.consulta = this.guardarConsulta();
    this.clientesService.getClientesLocalidadNombre(this.consulta).subscribe((resp:any)=> {
      this.clientes = resp.clientes;
      this.buscando = false;
      if(this.clientes.length === 0) {
        this.mensaje = true;
      }
      this.buscadorLocalidadNombre.reset();
    },(error)=> {
      this.buscando = false;
      console.log(error);
    });
  }

  guardarConsulta() {
    const guardarConsulta = {
      nombre:this.buscadorLocalidadNombre.get('nombre').value,
      localidad:this.buscadorLocalidadNombre.get('localidad').value,
    }
    return guardarConsulta;
  }

  buscarPorNombre() {
    this.verBuscadorNombre = true;
    this.verBuscadorLocalidad = false;
    this.verBuscadorLocalidadNombre = false;
    this.clientes = [];
    this.buscador.setValue("");
  }

  buscarPorLocalidad() {
    this.verBuscadorNombre = false;
    this.verBuscadorLocalidad = true;
    this.verBuscadorLocalidadNombre = false;
    this.clientes = [];
    this.buscadorLocalidad.setValue("");
  }

  buscarPorLocalidadNombre() {
    this.verBuscadorNombre = false;
    this.verBuscadorLocalidad = false;
    this.verBuscadorLocalidadNombre = true;
    this.clientes = [];
    //this.buscadorLocalidadNombre.setValue("");
  }

}
