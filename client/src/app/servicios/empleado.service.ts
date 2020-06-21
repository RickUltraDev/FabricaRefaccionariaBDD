import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";  //Ese es un servicio que hará httpRequests
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";  //Es el router de angular para redirigir a otras paginas

//Operaciones reactivas con el componente
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

import {ModelEmpleado } from "../modelos/ModelEmpleado"; //Modelo del objeto a mandar
import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla



@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
 //Nota: Api URI del servidor de nodejs se encuentra en environment.ts

 
 constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
 /* CRUD Methods for consuming RestAPI */
 httpOptions = {
   headers: new HttpHeaders({
     "Content-Type": "application/json"
   })
 };
 
 //Registro empleado
 async postRegistroCliente(modelEmpleado: ModelEmpleado) {
  return this.http
    .post<ModelEmpleado>(environment.apiUlrl + "/empleados/registro", JSON.stringify(modelEmpleado), this.httpOptions).subscribe((resp: {}) => {
      this.toastr.success("Registro exitoso ","Mostrando nuevo empleado");  
      this.router.navigate(["navigation/empleado/registrados"]);
    }, (error:any)=>{
      this.toastr.error("Los datos ingresados son incorrectos, verificalos.","Error");  
    });
}


 //Obtenter todos los empleados
 getEmpleados(): Observable<ModelEmpleado> {
  return this.http
    .get<ModelEmpleado>(environment.apiUlrl + "/empleados").pipe(retry(1), catchError(this.handleError));
}

 //Eliminación empleados
 deleteEmpleado(idEmpleado){
  return this.http
    .delete<ModelEmpleado>(environment.apiUlrl + "/empleados/elimina/"+ idEmpleado).pipe(retry(1), catchError(this.handleError));
}

//Obtenen al empleado que estoy buscando 
postBusquedaEmpleado(nombreCom:string, cargo:string){

  var divisiones = nombreCom.split(" ", 3);
  var nombre = divisiones[0];
  var apellido_paterno = divisiones[1];
  var apellido_materno = divisiones[2];
  return this.http
  .post<any>(environment.apiUlrl + "/empleados/busqueda", JSON.stringify({nombre, apellido_paterno, apellido_materno, cargo}),this.httpOptions);

  
}

 //Cambios de un empleado
putEmpleadoActualiza(empleado){
    return this.http.put<ModelEmpleado>(environment.apiUlrl+ "/empleados/actualiza/"+empleado.idEmpleado,empleado);
  
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