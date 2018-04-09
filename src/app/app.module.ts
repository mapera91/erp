import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ComprasComponent } from './compras/compras.component';
import { ListadoProvComponent } from './proveedores/listado-prov/listado-prov.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { CrearProvComponent } from './proveedores/crear-prov/crear-prov.component';

const rutas:Routes = [
  {path:'',component:InicioComponent},
  {path:'compras',component:ComprasComponent},
  {path:'listado-proveedores',component:ListadoProvComponent},
  {path:'crear-proveedor',component:CrearProvComponent},
  {path:'**',component:InicioComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ComprasComponent,
    ListadoProvComponent,
    CabeceraComponent,
    CrearProvComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ProveedoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
