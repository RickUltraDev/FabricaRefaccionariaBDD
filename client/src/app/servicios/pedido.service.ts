import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";  //Ese es un servicio que hará httpRequests
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";  //Es el router de angular para redirigir a otras paginas

//Operaciones reactivas con el componente
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla
import { ModelPedido } from '../modelos/ModelPedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
 /* CRUD Methods for consuming RestAPI */
 httpOptions = {
   headers: new HttpHeaders({
     "Content-Type": "application/json"
   })
 };
 

//Obtenter todos los pedidos
getPedidos(): Observable<ModelPedido> {
  return this.http
    .get<ModelPedido>(environment.apiUlrl + "/pedidos").pipe(retry(1), catchError(this.handleError));
}


//Obtenen un pedido buscado
postBusquedaPedido(idPedido:number, estatus_surtido:string, estatus_pago:string,fecha:string){
  return this.http
  .post<any>(environment.apiUlrl + "/pedidos/busqueda", JSON.stringify({idPedido, estatus_surtido, estatus_pago,fecha}),this.httpOptions); 
}

//Post detallePedidos
postPedidoDetalles(idPedido:number){
  return this.http
  .post<any>(environment.apiUlrl + "/detallepedidos/busqueda", JSON.stringify({idPedido}),this.httpOptions); 
}

//Sutir pieza 
postDetallePedido(idPedido:number, idPieza:number, cantidad:number){
  return this.http
  .post<any>(environment.apiUlrl + "/pedidos/surtir", JSON.stringify({ idPedido, idPieza,cantidad}),this.httpOptions); 
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
