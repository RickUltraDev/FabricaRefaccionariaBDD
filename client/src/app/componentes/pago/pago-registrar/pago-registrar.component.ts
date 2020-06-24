import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"; //Para redireccionar a otra ruta si es que se necesita
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios
import { ModelPago } from 'src/app/modelos/ModelPago';

// Servicios que usará la página
import { PagoService } from 'src/app/servicios/pago.service';


@Component({
  selector: 'app-pago-registrar',
  templateUrl: './pago-registrar.component.html',
  styleUrls: ['./pago-registrar.component.css']
})
export class PagoRegistrarComponent implements OnInit {

   //Formulario a comprobar
   public Pago: ModelPago;
   formval: FormGroup;
   TiposPag = ["Contado", "Credito"];
  

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private pagoService: PagoService
  ) { 
    //idpago, tipo, idPedido, fecha ,monto ,total
    this.formval = this.builder.group({
      tipo: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(8)]],
      fecha_pago: [null],
      monto: [null],
      total_llevado: [null, Validators.required],
      idPedido: [null, Validators.required]    
      
    });
    this.Pago = new ModelPago();
    this.formval.setValue(this.Pago);
  }

  ngOnInit(): void {
  }


  async postPago(){
   
    if(this.Pago.monto == undefined){
      this.Pago.monto = 0;
    }
    

    try {
      if (!this.formval.invalid) {
        
        await this.pagoService.postRegistroPago(this.Pago);
        
      }
    } catch (err) {
      console.log(err);
    }
      
   }

}
