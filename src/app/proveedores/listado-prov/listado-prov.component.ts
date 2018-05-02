import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AutenticacionService } from '../../servicios/autenticacion.service';

@Component({
  selector: 'app-listado-prov',
  templateUrl: './listado-prov.component.html',
  styleUrls: ['./listado-prov.component.css'],
  animations: [
    trigger('alerta',[state('show',style({opacity:1})),state('hide',style({opacity:0})),transition('show => hide',animate('500ms ease-out')),transition('hide => show',animate('500ms ease-in'))])
  ]
})

export class ListadoProvComponent implements OnInit {

  proveedores:any;
  id:string;
  mensaje:string = 'Error de conexión con el servidor';
  mostrarAlerta:boolean = false;
  desde:number = 0;
  total:number;
  botones:number[] = [];
  numeroBotones:number;
  tramoBotones:number = 0;

  constructor(private proveedoresService:ProveedoresService,
              private autenticacionService:AutenticacionService) { }

  ngOnInit() {
    this.cargarProveedores(); //Cuando se carga el componente se ejecuta cargarProveedores
  }

  get estadoAlerta() {
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  cargarProveedores() {
    this.proveedoresService.getProveedores(this.desde).subscribe((resp:any)=> { //subscribe para recojer los datos
      this.proveedores = resp.proveedores;
      this.total = resp.total;
      this.numeroBotones = this.total / 5;
      this.botones = [];
      var i;
      for(i=this.tramoBotones;i<this.tramoBotones+5;i++) {
        this.botones.push(i+1)
      }
      console.log(this.proveedores);
    },error=> {
      console.log(error);
    }) 
  }

  setDesde(valor) {
    var desde = this.desde + valor;
    if(desde >= this.total) {
      return;
    } else if(desde < 0) {
      return;
    } else {
      this.desde += valor;
      this.cargarProveedores();
    }
  }

  updateDesde(valor) {
    this.desde = valor;
    this.cargarProveedores();
  }

  avanzarBotones() {
    if(this.desde % 25 === 0) {
      this.botones = [];
      this.tramoBotones += 5;
      var i;
      for(i=this.tramoBotones;i<this.tramoBotones+5;i++) {
        this.botones.push(i+1)
      }
    }
  }

  avanzarTramoBotones() {
    this.botones = [];
    this.tramoBotones += 5;
    this.desde = this.tramoBotones * 5;
    this.cargarProveedores();
  }

  retrocederBotones() {
    if((this.desde + 5) % 25 === 0) {
      this.botones = [];
      this.tramoBotones -= 5;
      var i;
      for(i=this.tramoBotones;i=this.tramoBotones+5;i++) {
        this.botones.push(i+1)
      }
    }
  }

  retrocederTramoBotones() {
    this.botones = [];
    this.tramoBotones -= 5;
    this.desde = this.tramoBotones * 5;
    this.cargarProveedores();
  }

  obtenerId(id) {
    this.id = id;
  }

  borrarProveedor() {
    this.proveedoresService.deleteProveedor(this.id).subscribe((resp:any)=> {
      this.mensaje = "El proveedor ha sido eliminado correctamente";
      this.mostrarAlerta = true;
      this.cargarProveedores();
      setTimeout(()=> {
        this.mostrarAlerta = false;
      },3000);
    },(error:any)=> {
      if(error.error.mensaje === "Token incorrecto") {
        this.mensaje = 'Su sesión ha expirado';
      }
      this.mostrarAlerta = true;
      setTimeout(()=> {
        this.mostrarAlerta = false;
      },3000);
    });
    setTimeout(()=> {
      this.mensaje = 'Error de conexión con el servidor';
    },5000);
  }

}
