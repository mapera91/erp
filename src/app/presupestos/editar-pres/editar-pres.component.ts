import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { ClientesService } from '../../servicios/clientes.service';
import { ArticulosService } from '../../servicios/articulos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-pres',
  templateUrl: './editar-pres.component.html',
  styleUrls: ['./editar-pres.component.css']
})
export class EditarPresComponent implements OnInit {

  presupuestoForm: FormGroup;
  presupuesto:any;
  clientes:any;
  articulos:any;
  id:string;

  constructor(private pf:FormBuilder,
              private presupuestosService:PresupuestosService,
              private clientesService:ClientesService,
              private articulosService:ArticulosService,
              private router:Router,
              private route:ActivatedRoute) {
                setTimeout(()=> {
                  this.detectarCambios();
                },1000)
              }

  ngOnInit() {
    this.getId(this.route.snapshot.params['id']);
    this.cargarDatos();
    this.presupuestoForm = this.pf.group({
      cliente:null,
      cif:null,
      fecha:null,
      items: this.pf.array([  //metodo para inicializar un formulario dentro del formulario
        this.initItem()
      ]),
      suma:null,
      tipo:0.21,
      iva:null,
      total:null,
      num:null
    })
  }

  // ngAfterViewChecked() {  //Obliga a que primero ejecute el ngOnInit
  //   this.detectarCambios();
  // }

  cargarDatos() {
    this.clientesService.getTodosClientes().subscribe((resp:any)=> {
      this.clientes = resp.clientes;
    },(error)=> {
      console.log(error);
    });
    this.articulosService.getArticulos().subscribe((resp:any)=> {
      this.articulos = resp.articulos;
    },(error)=> {
      console.log(error);
    });
  }

  getId(id) {
    this.presupuestosService.getPresupuestoId(id).subscribe((resp:any)=> {
      this.presupuesto = resp.presupuesto;
      this.patchForm();
    },(error)=> {
      console.log(error);
    })
    this.id = id;
  }

  patchForm() {
    var numero = '000' + this.presupuesto.numero + '/18'
    this.presupuestoForm.patchValue({
      cliente:this.presupuesto.cliente,
      cif:this.presupuesto.cif,
      fecha:this.presupuesto.fecha,
      suma:this.presupuesto.suma,
      tipo:this.presupuesto.tipo,
      iva:this.presupuesto.iva,
      total:this.presupuesto.total,
      num:numero.slice(-7),
    })
    this.setPresupuestoItems();
  }

  setPresupuestoItems() {
    let control = <FormArray>this.presupuestoForm.controls.items;
    this.presupuesto.items.forEach(element=> {
      control.push(this.pf.group({
        articulo:element.articulo,
        cantidad:element.cantidad,
        precio:element.precio,
        importe:element.importe
      }))
    })
    this.removeItem(0); //Borramos el de indice 0, ya que lo crea de mas vacio
  }

  initItem() {
    return this.pf.group({  
      articulo:null,
      cantidad:null,
      precio:null,
      importe:null
    });
  }

  addItem() {
    const control = <FormArray>this.presupuestoForm.controls['items'];  //Crea un objeto sobre el que podemos añadir lineas
    control.push(this.initItem());  //Como initItem devuelve un formulario, con el push lo añadimos al objeto anterior
  }

  removeItem(i){
    const control = <FormArray>this.presupuestoForm.controls['items'];
    control.removeAt(i);
  }

  redondear(valor) {
    var valor;
    if (valor < 0){
      var resultado = Math.round(-valor * 100) / 100 * -1;
    } else {
      var resultado = Math.round(valor * 100) / 100;
    }
    return resultado;
  }

  detectarCambios() {
    this.presupuestoForm.valueChanges.subscribe(datos =>{
      var importe = 0;
      var suma = 0;
      var i;     //para los ciclos for dentro de un componente de angular antes se debe declarar la variable que usamos de indice
      for(i=0;i<datos.items.length;i++) {  //contador con el mismo numero de elementos que los del array
        var nombreArticulo = datos.items[i].articulo;
        var articuloCargado = this.articulos.find(function(articulo) {
          return articulo.nombre === nombreArticulo;
        });
        if(articuloCargado) {
          this.presupuestoForm.value.items[i].precio = articuloCargado.precio;
          this.presupuestoForm.value.items[i].importe = this.redondear(datos.items[i].cantidad * this.presupuestoForm.value.items[i].precio);
        } else {
          this.presupuestoForm.value.items[i].precio = 0; 
          this.presupuestoForm.value.items[i].importe = this.redondear(datos.items[i].cantidad * this.presupuestoForm.value.items[i].precio);
        }
        suma = suma + datos.items[i].importe; 
      }
      this.presupuestoForm.value.suma = suma;
      this.presupuestoForm.value.iva = this.redondear(this.presupuestoForm.value.suma * datos.tipo);
      this.presupuestoForm.value.total = this.redondear(this.presupuestoForm.value.suma + this.presupuestoForm.value.iva)
    })
  }
  
  editarPresupuesto(){
    this.presupuesto = this.guardarPresupuesto();
    this.presupuestosService.putPresupuesto(this.id,this.presupuesto).subscribe((resp:any)=>{
      this.router.navigate(['/listado-presupuestos']);
    },(error)=>{
      console.log(error);
    })
  }

  guardarPresupuesto(){
    const guardarPresupuesto = {
      cliente:this.presupuestoForm.get('cliente').value,
      fecha:this.presupuestoForm.get('fecha').value,
      cif:this.presupuestoForm.get('cif').value,
      items:this.presupuestoForm.get('items').value,
      suma:this.presupuestoForm.get('suma').value,
      tipo:this.presupuestoForm.get('tipo').value,
      iva:this.presupuestoForm.get('iva').value,
      total:this.presupuestoForm.get('total').value,
    }
    return guardarPresupuesto;
  }

}
