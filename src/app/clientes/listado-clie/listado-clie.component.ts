import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ClientesService } from '../../servicios/clientes.service';

@Component({
  selector: 'app-listado-clie',
  templateUrl: './listado-clie.component.html',
  styleUrls: ['./listado-clie.component.css'],
  animations: [
    trigger('alerta',[state('show',style({opacity:1})),state('hide',style({opacity:0})),transition('show => hide',animate('500ms ease-out')),transition('hide => show',animate('500ms ease-in'))])
  ]
})
export class ListadoClieComponent implements OnInit {

  clientes:any;
  id:string;
  mensaje:string;
  mostrarAlerta:boolean = false;

  constructor(private clientesService:ClientesService) { }

  ngOnInit() {
    this.cargarClientes(); //Cuando se carga el componente se ejecuta cargarClientes
  }

  get estadoAlerta() {
    return this.mostrarAlerta ? 'show' : 'hide';
  }

  cargarClientes() {
    this.clientesService.getClientes().subscribe((resp:any)=> { //subscribe para recojer los datos
      this.clientes = resp.clientes;
      console.log(this.clientes);
    },error=> {
      console.log(error);
    }) 
  }

  obtenerId(id) {
    this.id = id;
  }

  borrarCliente() {
    this.clientesService.deleteCliente(this.id).subscribe((resp:any)=> {
      this.mensaje = "El cliente ha sido eliminado correctamente";
      this.mostrarAlerta = true;
      this.cargarClientes();
      setTimeout(()=> {
        this.mostrarAlerta = false;
      },3000);
    },(error:any)=> {
      this.mensaje = 'Error de conexion con el servidor';
      this.mostrarAlerta = true;
      setTimeout(()=> {
        this.mostrarAlerta = false;
      },3000);
    });
  }

}
