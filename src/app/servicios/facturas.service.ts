import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FacturasService {

  constructor(private http:HttpClient) { }

  getFacturas() {
    let url = 'http://localhost:3000/factura';  //Cuando llamemos a getFacturas, se ejecutara la petición de url
    return this.http.get(url).map((resp:any)=> {  //map recibe una respuesta de tipo any
      console.log(resp);
      return resp;
    });
  }

  getFacturaId(id) {
    let url = 'http://localhost:3000/factura/'; //protocolo/dominio/id
    return this.http.get(url + id).map((resp:any)=> {
      console.log(resp);
      return resp;
    });

  }

  postFactura(factura) {
    let url = 'http://localhost:3000/factura';
    return this.http.post(url,factura).map((resp:any)=> {
      console.log(resp);
      return resp;
    });
  }

  putFactura(id,factura) {
    let url = 'http://localhost:3000/factura/'; //protocolo/dominio/id
    return this.http.put(url + id,factura).map((resp:any)=> {
      console.log(resp);
      return resp;
    });
  }

  deleteFactura(id) {
    let url = 'http://localhost:3000/factura/'; //protocolo/dominio/id
    return this.http.delete(url + id).map((resp:any)=> {
      console.log(resp);
      return resp;
    });
  }

}
