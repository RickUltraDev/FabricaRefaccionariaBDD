import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";  //Ese es un servicio que hará httpRequests
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";  //Es el router de angular para redirigir a otras paginas

//Operaciones reactivas con el componente
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla
import { ModelCliente } from '../modelos/ModelCliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };


   //Registro cliente
 async postRegistroCliente( modelCliente: ModelCliente) {
  return this.http
    .post<ModelCliente>(environment.apiUlrl + "/clientes/registro", JSON.stringify(modelCliente), this.httpOptions).subscribe((resp: {}) => {
      this.toastr.success("Registro exitoso ","Mostrando nuevo cliente");  
      this.router.navigate(["navigation/cliente/registrados"]);
    }, (error:any)=>{
      this.toastr.error("Los datos ingresados son incorrectos, verificalos.","Error");  
    });
}


  //Obtenter todas las piezas
  getClientes(): Observable<ModelCliente> {
    return this.http
      .get<ModelCliente>(environment.apiUlrl + "/clientes").pipe(retry(1), catchError(this.handleError));
  }

   //Eliminación pieza
 deleteCliente(idCliente){
  return this.http
    .delete<ModelCliente>(environment.apiUlrl + "/clientes/elimina/"+ idCliente).pipe(retry(1), catchError(this.handleError));
} 

 //Cambios de un cliente
 putClienteActualiza(cliente){
  return this.http.put<ModelCliente>(environment.apiUlrl+ "/clientes/actualiza/"+cliente.idCliente,cliente);

}


  //Obtenen el cliente buscado
postBusquedaCliente(razon_social:string){
  return this.http
  .post<any>(environment.apiUlrl + "/clientes/busqueda", JSON.stringify({razon_social}),this.httpOptions); 
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
