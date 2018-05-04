import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'
import  { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ComprasComponent } from './compras/compras.component';
import { ListadoProvComponent } from './proveedores/listado-prov/listado-prov.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { CrearProvComponent } from './proveedores/crear-prov/crear-prov.component';
import { EditarProvComponent } from './proveedores/editar-prov/editar-prov.component';
import { FacturasService } from './servicios/facturas.service';
import { ListadoFactComponent } from './facturas/listado-fact/listado-fact.component';
import { CrearFactComponent } from './facturas/crear-fact/crear-fact.component';
import { EditarFactComponent } from './facturas/editar-fact/editar-fact.component';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { LoginComponent } from './autenticacion/login/login.component';
import { VentasComponent } from './ventas/ventas.component';
import { ListadoClieComponent } from './clientes/listado-clie/listado-clie.component';
import { CrearClieComponent } from './clientes/crear-clie/crear-clie.component';
import { EditarClieComponent } from './clientes/editar-clie/editar-clie.component';
import { ListadoPresComponent } from './presupestos/listado-pres/listado-pres.component';
import { CrearPresComponent } from './presupestos/crear-pres/crear-pres.component';
import { EditarPresComponent } from './presupestos/editar-pres/editar-pres.component';
import { ClientesService } from './servicios/clientes.service';
import { PresupuestosService } from './servicios/presupuestos.service';
import { AutenticacionGuard } from './servicios/autenticacion.guard';
import { ListadoUsuariosComponent } from './autenticacion/listado-usuarios/listado-usuarios.component';
import { SesionesComponent } from './autenticacion/sesiones/sesiones.component';
import { CrearArtiComponent } from './articulos/crear-arti/crear-arti.component';
import { ListadoArtiComponent } from './articulos/listado-arti/listado-arti.component';


const rutas:Routes = [
  {path:'',component:InicioComponent},
  {path:'registro',component:RegistroComponent},
  {path:'inicio-sesion',component:LoginComponent},
  {path:'listado-usuarios',component:ListadoUsuariosComponent,canActivate:[AutenticacionGuard]},
  {path:'sesiones',component:SesionesComponent,canActivate:[AutenticacionGuard]},
  {path:'sesiones/:nombre',component:SesionesComponent,canActivate:[AutenticacionGuard]},
  {path:'compras',component:ComprasComponent,canActivate:[AutenticacionGuard]},
  {path:'listado-proveedores',component:ListadoProvComponent,canActivate:[AutenticacionGuard]},
  {path:'crear-proveedor',component:CrearProvComponent,canActivate:[AutenticacionGuard]},
  {path:'editar-proveedor/:id',component:EditarProvComponent,canActivate:[AutenticacionGuard]},
  {path:'listado-facturas',component:ListadoFactComponent,canActivate:[AutenticacionGuard]},
  {path:'crear-factura',component:CrearFactComponent,canActivate:[AutenticacionGuard]},
  {path:'editar-factura/:id',component:EditarFactComponent,canActivate:[AutenticacionGuard]},
  {path:'ventas',component:VentasComponent,canActivate:[AutenticacionGuard]},
  {path:'listado-clientes',component:ListadoClieComponent,canActivate:[AutenticacionGuard]},
  {path:'crear-cliente',component:CrearClieComponent,canActivate:[AutenticacionGuard]},
  {path:'editar-cliente/:id',component:EditarClieComponent,canActivate:[AutenticacionGuard]},
  {path:'listado-presupuestos',component:ListadoPresComponent,canActivate:[AutenticacionGuard]},
  {path:'crear-presupuesto',component:CrearPresComponent,canActivate:[AutenticacionGuard]},
  {path:'editar-presupuesto/:id',component:EditarPresComponent,canActivate:[AutenticacionGuard]},
  {path:'listado-articulos',component:ListadoArtiComponent,canActivate:[AutenticacionGuard]},
  {path:'crear-articulo',component:CrearArtiComponent,canActivate:[AutenticacionGuard]},
  {path:'**',component:InicioComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ComprasComponent,
    ListadoProvComponent,
    CabeceraComponent,
    CrearProvComponent,
    EditarProvComponent,
    ListadoFactComponent,
    CrearFactComponent,
    EditarFactComponent,
    RegistroComponent,
    LoginComponent,
    VentasComponent,
    ListadoClieComponent,
    CrearClieComponent,
    EditarClieComponent,
    ListadoPresComponent,
    CrearPresComponent,
    EditarPresComponent,
    ListadoUsuariosComponent,
    SesionesComponent,
    CrearArtiComponent,
    ListadoArtiComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [ProveedoresService, FacturasService, AutenticacionService, ClientesService, PresupuestosService, AutenticacionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
