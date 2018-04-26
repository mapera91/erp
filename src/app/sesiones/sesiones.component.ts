import { Component, OnInit } from '@angular/core';
import { SesionesService } from '../servicios/sesiones.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css']
})
export class SesionesComponent implements OnInit {

  sesion:any;

  constructor(private sesionesService:SesionesService,
              private router:Router) { }

  ngOnInit() {
  }

  verSesiones() {
    this.sesionesService.getSesiones().subscribe((resp:any)=> {
      this.router.navigate(['/']);
    })
  }

}