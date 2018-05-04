import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ClientesService {

  constructor(private http:HttpClient) { }

  getTodosClientes() {
    let url = 'http://localhost:3000/cliente';
    return this.http.get(url).map((resp:any)=> {
      console.log(resp);
      return resp;
    });
  }

  getClientes(nombre) {
    let url = 'http://localhost:3000/cliente/nombre/' + nombre;  //Cuando llamemos a getClientes le tenemos que pasar un nombre y se ejecutara la petición de url
    return this.http.get(url).map((resp:any)=> {  //map recibe una respuesta de tipo any
      console.log(resp);
      return resp;
    });
  }

  getClientesLocalidad(localidad) {
    let url = 'http://localhost:3000/cliente/localidad/' + localidad;
    return this.http.get(url).map((resp:any)=> {
      console.log(resp);
      return resp;
    });
  }

  getClientesLocalidadNombre(consulta) {
    let url = 'http://localhost:3000/cliente/mixto/' + consulta.nombre + '/' + consulta.localidad;
    return this.http.get(url).map((resp:any)=> {
      console.log(resp);
      return resp;
    });
  }

//Cuando queramos tener para el mismo verbo distintos tipos de ejecuciones, nos creamos una ruta adicional
  getClienteId(id) {
    let url = 'http://localhost:3000/cliente/'; //protocolo/dominio/id
    return this.http.get(url + id).map((resp:any)=> {
      console.log(resp);
      return resp;
    });

  }

  postCliente(cliente) {
    let url = 'http://localhost:3000/cliente';
    return this.http.post(url,cliente).map((resp:any)=> {
      console.log(resp);
      return resp;
    });
  }

  putCliente(id,cliente) {
    let url = 'http://localhost:3000/cliente/'; //protocolo/dominio/id
    return this.http.put(url + id,cliente).map((resp:any)=> {
      console.log(resp);
      return resp;
    });
  }

  deleteCliente(id) {
    let url = 'http://localhost:3000/cliente/'; //protocolo/dominio/id
    return this.http.delete(url + id).map((resp:any)=> {
      console.log(resp);
      return resp;
    });
  }

}
