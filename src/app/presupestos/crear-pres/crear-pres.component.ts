import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { ClientesService } from '../../servicios/clientes.service';


@Component({
  selector: 'app-crear-pres',
  templateUrl: './crear-pres.component.html',
  styleUrls: ['./crear-pres.component.css']
})
export class CrearPresComponent implements OnInit {

  presupuestoForm: FormGroup;
  presupuesto:any;
  clientes:any;

  constructor(private pf: FormBuilder,
              private presupuestosService: PresupuestosService,
              private clientesService: ClientesService) { }

  ngOnInit() {
    this.cargarClientes();
    this.presupuestoForm = this.pf.group({
      cliente:null,
      fecha:null,
      items: this.pf.array([  //metodo para inicializar un formulario dentro del formulario
        this.initItem()
      ]),
      suma:null
    })
    this.detectarCambios();
  }

  // ESQUEMA:
  //   cliente:...
  //   fecha:...
  //   items:[{
  //     articulo:...
  //     importe:...
  //   }]

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

  removeItem(i) {
    const control = <FormArray>this.presupuestoForm.controls['items'];  
    control.removeAt(i); 

  }

  cargarClientes() {
    this.clientesService.getTodosClientes().subscribe((resp:any)=> {
      this.clientes = resp.clientes;
    },(error)=> {
      console.log(error);
    });
  }

  detectarCambios() {
    this.presupuestoForm.valueChanges.subscribe(datos=> {
      var importe = 0;
      var j;
      for(j=0;j<datos.items.length;j++) {
        var cantidad = datos.items[j].cantidad;
        var precio = datos.items[j].precio;
        this.presupuestoForm.value.items[j].importe = cantidad * precio;
        console.log();
      }
      var suma = 0;
      var i;     //para los ciclos for dentro de un componente de angular antes se debe declarar la variable que usamos de indice
      for(i=0;i<datos.items.length;i++) {  //contador con el mismo numero de elementos que los del array
        suma = suma + datos.items[i].importe;  //extraemos del array con indice i el importe
      }
      this.presupuestoForm.value.suma = suma;
    })
  }

}