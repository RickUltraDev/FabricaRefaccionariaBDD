import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios

/*Servicios usados*/
import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla
import { FacturaService } from 'src/app/servicios/factura.service';

@Component({
  selector: 'app-factura-registrados',
  templateUrl: './factura-registrados.component.html',
  styleUrls: ['./factura-registrados.component.css']
})
export class FacturaRegistradosComponent implements OnInit {
  facturas: any = [];
  titulos: any[] = [{"name": "# factura"},{"name": "fecha"},{ "name": "# pedido"},
  {"name": "id empleado"}, {"name": "total"}];


   //Variables de la busqueda
   public idFactura:number;
   public idPedido:number;
   public idEmpleado:number;

   
   //Formulario de busqueda
   busquedaForm: FormGroup;

  constructor(
    private facturaService: FacturaService,
    private router: Router,
    private toastr:ToastrService,
    private builder: FormBuilder
  ) { 
    this.busquedaForm = this.builder.group({
      idFactura: [null],
      idPedido: [null],
      idEmpleado: [null]
    });
  }

  ngOnInit(): void {
    this.cargarFacturas();
  }

  cargarFacturas(){
    return this.facturaService.getFacturas().subscribe((resp: any) => {
      if(resp != null){
         this.facturas = resp["info"][0];
         console.log(this.facturas);
         
      }
   }, (error:any)=>{
    this.toastr.error("Se produjo un error.","Error");  
    this.router.navigate(["navigation"]);});
  }

  busquedaFactura(){

    if(this.idFactura == undefined){
        this.idFactura = 0;
    }

    if(this.idPedido == undefined){
      this.idPedido = 0;
    }

    if(this.idEmpleado == undefined){
      this.idEmpleado = 0;
    }

    return this.facturaService.postBusquedaFactura(this.idFactura,this.idPedido, this.idEmpleado).subscribe((resp:any) => {
      this.facturas = resp["info"][0];
      console.log(resp);
      
      this.toastr.info("Objeto encontrado.","Listo");  
       
  }, (error:any)=>{
    this.facturas = null;
    this.toastr.error("No se ha encontrado, verifica los datos","Error");  
  });
  }
  


}
