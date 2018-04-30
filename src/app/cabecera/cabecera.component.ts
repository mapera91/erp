import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  sesion:any;
  duracion:any;

  constructor(private autenticacionService:AutenticacionService) { }

  ngOnInit() {
  }

  getLogged() {
    return this.autenticacionService.isLogged();
  }

  crearSesion(){
    var ultimoLogin = JSON.parse(localStorage.getItem('ultimoLogin'));
    var ultimoLoginMS = new Date(ultimoLogin).valueOf();
    console.log(ultimoLoginMS);
    var fechaActualMS = new Date().valueOf();
    var duracionS = (fechaActualMS - ultimoLoginMS) / 1000;
    console.log(duracionS);

    var s = Math.floor(duracionS % 60);
    var ss = ("0" + s).slice(-2);
    var m = Math.floor((duracionS % 3600) / 60);
    var mm = ("0" + m).slice(-2);
    var h = Math.floor(duracionS / 3600);
    var hh = ("0" + h).slice(-2);
    console.log(hh+":"+mm+":"+ss)

    this.sesion = {
      sesion:this.autenticacionService.nombre,
      fechaLogout:new Date,
      duracion:hh+" horas, "+mm+" minutos y "+ss+" segundos"
    }
    this.autenticacionService.postSesion(this.sesion).subscribe((resp)=> {
      console.log(resp);
    },(error)=> {
      console.log(error);
    })
  }

}
