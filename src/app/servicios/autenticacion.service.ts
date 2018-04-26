import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

@Injectable()
export class AutenticacionService {

  token:string;
  nombre:string;
  rol:string;

  constructor(private http:HttpClient,
              private router:Router) {
    this.cargarCredendiales();
  }
  
  getUsuarios() {
    let url = 'http://localhost:3000/usuario';
    return this.http.get(url).map((resp:any)=> {
      console.log(resp);
      return resp;
    });
  }

  postUsuario(usuario) {
    let url = 'http://localhost:3000/usuario';
    return this.http.post(url,usuario).map((resp:any)=> {
      console.log(resp);
      return resp;
    });
  }

  putUsuario(id,usuario) {
    let url = 'http://localhost:3000/usuario/';
    return this.http.put(url + id,usuario).map((resp:any)=> {
      console.log(resp);
      return resp;
    });
  }

  deleteUsuario(id) {
    let url = 'http://localhost:3000/usuario/';
    return this.http.delete(url + id).map((resp:any)=> {
      console.log(resp);
      return resp;
    });
  }

  login(usuario) {
    let url = 'http://localhost:3000/login';
    return this.http.post(url,usuario).map((resp:any)=> {
      console.log(resp);
      this.guardarCredenciales(resp.token,resp.nombre,resp.rol);
      return resp;
    });
  }

  guardarCredenciales(token,nombre,rol) {
    localStorage.setItem('token',token);
    localStorage.setItem('nombre',nombre);
    localStorage.setItem('rol',rol);
    this.token = token;
  }

  cargarCredendiales() {
    if(localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.nombre = localStorage.getItem('nombre');
      this.rol = localStorage.getItem('rol');
    } else {
      this.token = "";
      this.nombre = "";
      this.rol = "";
    }
  }

  isLogged() {
    return (this.token.length > 0) ? true : false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('rol');
    this.token = "";
    this.nombre = "";
    this.rol = "";
    this.router.navigate(['/inicio-sesion']);
  }

  getPerLisUsuarios() {
    if(this.rol === "administrador") {
      return true;
    } else {
      return false;
    }
  }

  getPerCompras() {
    if(this.rol === "administrador" || this.rol === "director compras" || this.rol === "empleado compras") {
      return true;
    } else {
      return false;
    }
  }

  getPerVentas() {
    if(this.rol === "administrador" || this.rol === "director ventas" || this.rol === "empleado ventas") {
      return true;
    } else {
      return false;
    }
  }

  getPerContabilidad() {
    if(this.rol === "administrador" || this.rol === "director ventas" || this.rol === "director compras") {
      return true;
    } else {
      return false;
    }
  }

  getPerProveedores() {
    if(this.rol === "administrador" || this.rol === "director compras") {
      return true;
    } else {
      return false;
    }
  }

}
