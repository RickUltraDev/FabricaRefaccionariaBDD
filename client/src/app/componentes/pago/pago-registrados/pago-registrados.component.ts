import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios
import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla
import { PagoService } from 'src/app/servicios/pago.service';

@Component({
  selector: 'app-pago-registrados',
  templateUrl: './pago-registrados.component.html',
  styleUrls: ['./pago-registrados.component.css']
})
export class PagoRegistradosComponent implements OnInit {

  pagos: any = [];
  //idpago, tipo, idPedido, fecha ,monto ,total
  titulos: any[] = [{"name": "# Pago"},{"name": "tipo pago"},{ "name": "# Pedido"},
  { "name": "fecha"},{"name": "monto"}, {"name": "total"}];

  TiposPag = ["Contado", "Credito"];

  //Formulario de busqueda
  formval: FormGroup;
  idPedido:number;

  constructor(
    private pagoService: PagoService,
    private router: Router,
    private toastr:ToastrService,
    private builder: FormBuilder,
  ) { 
    this.formval = this.builder.group({
      idPedido: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]]
    });
  }

  ngOnInit(): void {
    this.cargarPagos();
  }

  cargarPagos(){

    return this.pagoService.getPagos().subscribe((resp: any) => {
      if(resp != null){
        this.pagos = resp["info"][0];  
        console.log(this.pagos);
        
                
      }
    }, (error:any)=>{
    this.toastr.error("Se produjo un error.","Error");  
    this.router.navigate(["navigation"]);});
  
  }

  

  busquedaPago(){ 
   
    return this.pagoService.postBusquedaPago(this.idPedido).subscribe((resp:any) => {
      this.pagos = resp["info"][0];
      this.toastr.info("Objeto encontrado.","Listo");  
       
  }, (error:any)=>{
    this.pagos = null;
    this.toastr.error("No se ha encontrado, verifica los datos","Error");  
  });

  }




}
