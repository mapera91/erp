import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { ClientesService } from '../../servicios/clientes.service';

@Component({
  selector: 'app-editar-clie',
  templateUrl: './editar-clie.component.html',
  styleUrls: ['./editar-clie.component.css']
})
export class EditarClieComponent implements OnInit {

  @ViewChild('cif') cifRef: ElementRef;

  clienteForm:FormGroup;
  cliente:any;
  provincias:string[] = ['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ceuta','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Gibraltar','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Melilla','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];
  mensaje:string = 'Error de conexión con el servidor';
  mostrarAlerta:boolean = false;
  enviando:boolean = false;
  id:string;

  constructor(private cf:FormBuilder,
              private clientesService:ClientesService,
              private router:Router,
              private route:ActivatedRoute) { 
                if(!this.cliente) {
                  this.cliente = {};
                }
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.cargarCliente(this.id);
    this.clienteForm = this.cf.group({
      nombre:null,
      cif:null,
      domicilio:null,
      cp:null,
      localidad:null,
      provincia:null,
      telefono:null,
      email:null,
      contacto:null,
      alta:null
    })
  }

  cargarCliente(id) {
    this.clientesService.getClienteId(id).subscribe((resp:any)=> {
      this.cliente = resp.cliente;
      console.log(this.cliente);
    })
  }

  editarClie() {
    this.cliente = this.guardarClie();
    this.clientesService.putCliente(this.id,this.cliente).subscribe((resp:any)=> {
      this.router.navigate(['/listado-clientes']);
    })
  }

  guardarClie() {
    const guardarClie = {
      nombre:this.clienteForm.get('nombre').value,
      cif:this.clienteForm.get('cif').value,
      domicilio:this.clienteForm.get('domicilio').value,
      cp:this.clienteForm.get('cp').value,
      localidad:this.clienteForm.get('localidad').value,
      provincia:this.clienteForm.get('provincia').value,
      telefono:this.clienteForm.get('telefono').value,
      email:this.clienteForm.get('email').value,
      contacto:this.clienteForm.get('contacto').value
    }
    return guardarClie;
  }


}
