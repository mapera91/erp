import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { FacturasService } from '../../servicios/facturas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-fact',
  templateUrl: './editar-fact.component.html',
  styleUrls: ['./editar-fact.component.css'],
})
export class EditarFactComponent implements OnInit {

  @ViewChild('cif') cifRef: ElementRef;

  facturaForm:FormGroup;
  factura:any;
  base:number;
  iva:number;
  importe:number;
  total:number;
  irpf:number;
  retencion:boolean;
  cif:string;
  id:string;

  constructor(private ff:FormBuilder,
              private facturasService:FacturasService,
              private router:Router,
              private route:ActivatedRoute) { 
                if(!this.factura) {
                  this.factura = {};
                }
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.cargarFactura(this.id);
    this.facturaForm = this.ff.group({
      proveedor:null,
      cif:null,
      fecha:null,
      concepto:null,
      base:null,
      retencion:null,
      iva:null,
      irpf:null,
      importe:null,
      total:null
    });
    this.detectarCambios();
  }

  cargarFactura(id) {
    this.facturasService.getFacturaId(id).subscribe((resp:any)=> {
      this.factura = resp.factura;
      console.log(this.factura);
    })
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
    this.facturaForm.valueChanges.subscribe((factura) => {
      this.base = this.redondear(factura.base);
      this.retencion = factura.retencion;
      this.iva = factura.iva;
      if(this.retencion) {
        this.irpf = this.redondear(this.base * -0.15);
      } else {
        this.irpf = 0;
      }
      this.importe = this.redondear(this.base * this.iva);
      this.total = this.redondear(this.base + this.irpf + this.importe);
      this.factura.irpf = this.formatearMoneda(this.irpf);
      this.factura.importe = this.formatearMoneda(this.importe);
      this.factura.total = this.formatearMoneda(this.total);
    })
  }

  editarFact() {
    this.factura = this.guardarFact();
    this.facturasService.putFactura(this.id,this.factura).subscribe((resp:any)=> {
      this.router.navigate(['/listado-facturas']);
    })
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
      total:this.facturaForm.get('total').value
    }
    return guardarFact;
  }

}
