import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";  //Ese es un servicio que hará httpRequests
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";  //Es el router de angular para redirigir a otras paginas

//Operaciones reactivas con el componente
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla
import { ModelPago } from '../modelos/ModelPago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
 /* CRUD Methods for consuming RestAPI */
 httpOptions = {
   headers: new HttpHeaders({
     "Content-Type": "application/json"
   })
 };


  //Registro pago
  async postRegistroPago(modelPago: ModelPago) {
    return this.http
      .post<ModelPago>(environment.apiUlrl + "/pagos/registro", JSON.stringify(modelPago), this.httpOptions).subscribe((resp: {}) => {
        this.toastr.success("Registro exitoso ","Mostrando nuevo pago");  
        this.router.navigate(["navigation/pago/registrados"]);
      }, (error:any)=>{
        this.toastr.error("Los datos ingresados son incorrectos, verificalos.","Error");  
      });
  }

 //Obtenter todos los pagos
getPagos(): Observable<ModelPago> {
  return this.http
    .get<ModelPago>(environment.apiUlrl + "/pagos").pipe(retry(1), catchError(this.handleError));
}


//Obtenen un pago
postBusquedaPago(idPedido:number){
  return this.http
  .post<any>(environment.apiUlrl + "/pagos/busqueda", JSON.stringify({idPedido}),this.httpOptions); 
}




handleError(error) {
  let errorMessage = "";
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Codigo de error: ${error.status}\nMensaje: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
}




}
