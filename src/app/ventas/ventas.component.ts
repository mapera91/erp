import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../servicios/presupuestos.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  ChartOptions = {
    responsive:true
  }

  chartPtosTrimestre:any = [];
  chartTotalesClientes:any = [];

  presupuestos:any;
  totalPorCliente:any
  ptosPrMes:any;
  ptosSgMes:any;
  ptosTrMes:any;
  diaPrMes:any = new Date('2018-04-01').valueOf();
  diaSgMes:any = new Date('2018-05-01').valueOf();
  diaTrMes:any = new Date('2018-06-01').valueOf();
  diaCtMes:any = new Date('2018-07-01').valueOf();
  totalPrMes:any = 0;
  totalSgMes:any = 0;
  totalTrMes:any = 0;
  PrMes:string = 'Abril';
  SgMes:string = 'Mayo';
  TrMes:string = 'Junio';
  labeltrimestre:string = 'Presupuestos Segundo Trimestre';
  

  constructor(private presupuestosSevice:PresupuestosService) { }

  ngOnInit() {
    this.cargarGraficoPresupuestos();
    this.cargarGraficoClientes();
  }

  cargarGraficoPresupuestos() {
    this.presupuestosSevice.getPresupuestos().subscribe((resp:any)=> {
      this.presupuestos = resp.presupuestos;
      this.ptosPrMes = this.presupuestos.filter(element => new Date(element.fecha).valueOf() >= this.diaPrMes && new Date(element.fecha).valueOf() < this.diaSgMes);
      this.ptosPrMes.forEach(ptosPrMes=> {
        this.totalPrMes += ptosPrMes.total;
      });
      this.ptosSgMes = this.presupuestos.filter(element => new Date(element.fecha).valueOf() >= this.diaSgMes && new Date(element.fecha).valueOf() < this.diaTrMes);
      this.ptosSgMes.forEach(ptosSgMes=> {
        this.totalSgMes += ptosSgMes.total;
      });
      this.ptosTrMes = this.presupuestos.filter(element => new Date(element.fecha).valueOf() >= this.diaTrMes && new Date(element.fecha).valueOf() < this.diaCtMes);
      this.ptosTrMes.forEach(ptosTrMes=> {
        this.totalTrMes += ptosTrMes.total;
      });
      this.chartPtosTrimestre = new Chart('grafico1',{
        type:'line',
        data:{
          labels:[this.PrMes,this.SgMes,this.TrMes], //array con lo que queremos que aparezca en el eje de las X
          datasets:[
            {
              data:[this.totalPrMes,this.totalSgMes,this.totalTrMes], //datos del eje Y
              label:this.labeltrimestre, //leyenda
              borderColor:'#dc143c',
              fill:false,
            }
          ]
        }
      });
    },(error)=> {
      console.log(error);
    });
  }

  cargarGraficoClientes() {
    this.presupuestosSevice.getTotalesPorCliente().subscribe((resp:any)=> {
      this.totalPorCliente = resp.presupuestos;
      let clientes = [];
      let totales = [];
      this.totalPorCliente.forEach(element=> {
        clientes.push(element._id.cliente);
        totales.push(element.total);
      });
      this.chartTotalesClientes = new Chart('grafico2',{
        type:'pie',
        data:{
          labels:clientes, //array con lo que queremos que aparezca en el eje de las X
          datasets:[
            {
              backgroundColor:['#0080FF','#80FF00','#FF4000','#BF00FF','#FFBF00','#610B21'],
              data:totales, //datos del eje Y
            }
          ]
        }
      });
    },(error)=> {
      console.log(error);
    });
  }

  primerTrimestre() {
    this.diaPrMes = new Date('2018-01-01').valueOf();
    this.diaSgMes = new Date('2018-02-01').valueOf();
    this.diaTrMes = new Date('2018-03-01').valueOf();
    this.diaCtMes = new Date('2018-04-01').valueOf();
    this.totalPrMes = 0;
    this.totalSgMes = 0;
    this.totalTrMes = 0;
    this.PrMes = 'Enero';
    this.SgMes = 'Febrero';
    this.TrMes = 'Marzo';
    this.labeltrimestre = 'Presupuestos Primer Trimestre';
    this.chartPtosTrimestre.destroy();
    this.cargarGraficoPresupuestos();
  }

  segundoTrimestre() {
    this.diaPrMes = new Date('2018-04-01').valueOf();
    this.diaSgMes = new Date('2018-05-01').valueOf();
    this.diaTrMes = new Date('2018-06-01').valueOf();
    this.diaCtMes = new Date('2018-07-01').valueOf();
    this.totalPrMes = 0;
    this.totalSgMes = 0;
    this.totalTrMes = 0;
    this.PrMes = 'Abril';
    this.SgMes = 'Mayo';
    this.TrMes = 'Junio';
    this.labeltrimestre = 'Presupuestos Segundo Trimestre';
    this.chartPtosTrimestre.destroy();
    this.cargarGraficoPresupuestos();
  }

}
