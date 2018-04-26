import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { FacturasService } from '../../servicios/facturas.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-crear-fact',
  templateUrl: './crear-fact.component.html',
  styleUrls: ['./crear-fact.component.css'],
  animations: [
    trigger('alerta',[state('show',style({opacity:1})),state('hide',style({opacity:0})),transition('show => hide',animate('500ms ease-out')),transition('hide => show',animate('500ms ease-in'))])
  ]
})
export class CrearFactComponent implements OnInit {

  @ViewChild('cif') cifRef: ElementRef;

  facturaForm:FormGroup;
  factura:any;
  base:number;
  iva:number;
  importe:number;
  total:number;
  irpf:number;
  retencion:boolean = false;
  cif;
  mensaje:string = 'Error de conexión con el servidor';
  mostrarAlerta:boolean = false;
  enviando:boolean = false;

  constructor(private ff:FormBuilder,
              private facturasService:FacturasService,
              private router:Router) { }

  ngOnInit() {
    this.iniciarFormulario();
  }

  get estadoAlerta() {
    return this.mostrarAlerta ? 'show' : 'hide';
  }
            
  iniciarFormulario() {
    this.facturaForm = this.ff.group({
      proveedor:[null,Validators.required],
      cif:[null,Validators.required],
      fecha:null,
      concepto:null,
      base:[null,Validators.required],
      retencion:false,
      iva:0.21,
      irpf:this.formatearMoneda(0),
      importe:this.formatearMoneda(0),
      total:this.formatearMoneda(0),
    });
    this.detectarCambios();
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

  formatearMoneda(valor) {
    var resultado = new Intl.NumberFormat("es-ES",{style:"currency",currency:"EUR"}).format(valor);
    return resultado;
  }

  detectarCambios() {
    this.facturaForm.valueChanges.subscribe((valorForm) => {
      this.base = this.redondear(valorForm.base);
      this.retencion = valorForm.retencion;
      this.iva = valorForm.iva;
      if(this.retencion) {
        this.irpf = this.redondear(this.base * -0.15);
      } else {
        this.irpf = 0;
      }
      this.importe = this.redondear(this.base * this.iva);
      this.total = this.redondear(this.base + this.irpf + this.importe);
      this.facturaForm.value.irpf = this.formatearMoneda(this.irpf);
      this.facturaForm.value.importe = this.formatearMoneda(this.importe);
      this.facturaForm.value.total = this.formatearMoneda(this.total);
    })
  }

  crearFact() {
    this.mostrarAlerta = false;
    this.enviando = true;
    this.factura = this.guardarFact();
    this.facturasService.postFactura(this.factura).subscribe((resp:any)=> {
      this.router.navigate(['/listado-facturas']);
      this.enviando = false;
    },(error:any)=> {
      this.mostrarAlerta = true;
      this.enviando = false;
      if(error.error.errores.errors.cif.message) {
        this.mensaje = error.error.errores.errors.cif.message;
        this.cifRef.nativeElement.focus();
      }
    });
  }

  guardarFact() {
    const guardarFact = {
      proveedor:this.facturaForm.get('proveedor').value,
      cif:this.facturaForm.get('cif').value,
      fecha:this.facturaForm.get('fecha').value,
      concepto:this.facturaForm.get('concepto').value,
      base:this.facturaForm.get('base').value,
      retencion:this.facturaForm.get('retencion').value,
      iva:this.facturaForm.get('iva').value,
      irpf:this.facturaForm.get('irpf').value,
      importe:this.facturaForm.get('importe').value,
      total:this.facturaForm.get('total').value,
    }
    return guardarFact;
  }

}
