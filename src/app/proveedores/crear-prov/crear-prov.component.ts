import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-crear-prov',
  templateUrl: './crear-prov.component.html',
  styleUrls: ['./crear-prov.component.css']
})
export class CrearProvComponent implements OnInit {

  proveedorForm:FormGroup;
  proveedor:any;

  provincias:string[] = ['Álava', 'Albacete','Alicante','Almería', 'Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ceuta','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Gibraltar','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Melilla','Murcia','Navarra','Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona','Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza'];

  constructor(private pf:FormBuilder,private proveedoresService:ProveedoresService) {  }

  ngOnInit() {
    this.proveedorForm = this.pf.group({
      nombre:null,
      cif:null,
      direccion:null,
      cp:null,
      localidad:null,
      provincia:null,
      telefono:null,
      email:null,
      contacto:null,
      alta:null
    })
  }

  crearProv(){
    this.proveedor = this.guardarProv();
    this.proveedoresService.postProveedor(this.proveedor).subscribe((resp:any)=> {
      console.log(resp);
    },(error:any)=> {
      console.log(error);
    });
  }

  guardarProv() {
    const guardarProv = {
      nombre:this.proveedorForm.get('nombre').value,
      cif:this.proveedorForm.get('cif').value,
      direccion:this.proveedorForm.get('direccion').value,
      cp:this.proveedorForm.get('cp').value,
      localidad:this.proveedorForm.get('localidad').value,
      provincia:this.proveedorForm.get('provincia').value,
      telefono:this.proveedorForm.get('telefono').value,
      email:this.proveedorForm.get('email').value,
      contacto:this.proveedorForm.get('contacto').value
    }
    return guardarProv;
  }

}
