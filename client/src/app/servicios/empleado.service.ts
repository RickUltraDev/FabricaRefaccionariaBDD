import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";  //Ese es un servicio que hará httpRequests
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";  //Es el router de angular para redirigir a otras paginas

//Operaciones reactivas con el componente
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";


import { ModelEmpleado } from "../modelos/ModelEmpleado"; //Modelo del objeto a mandar

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
 //Nota: Api URI del servidor de nodejs se encuentra en environment.ts

 
 constructor(private http: HttpClient, private router: Router) { }
 /* CRUD Methods for consuming RestAPI */
 httpOptions = {
   headers: new HttpHeaders({
     "Content-Type": "application/json"
   })
 };
 
 //Obtenter todos los empleados
 getEmpleados(): Observable<ModelEmpleado> {
  return this.http
    .get<ModelEmpleado>(environment.apiUlrl + "/empleados").pipe(retry(1), catchError(this.handleError));
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