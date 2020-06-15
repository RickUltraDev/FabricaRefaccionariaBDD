import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";  //Ese es un servicio que hará httpRequests

//Operaciones reactivas con el componente
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";


import { environment } from '../../environments/environment';
import { Router } from "@angular/router";  //Es el router de angular para redirigir a otras paginas


import { ModelLogin } from "../modelos/ModelLogin"; //Modelo del objeto a mandar
import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
 //Nota: Api URI del servidor de nodejs se encuentra en environment.ts

 //Datos del logeado
  empleado: ModelLogin;
  valor:boolean;

 constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
 /* CRUD Methods for consuming RestAPI */
 httpOptions = {
   headers: new HttpHeaders({
     "Content-Type": "application/json"
   })
 };

 
 //Función para iniciar sesion
 async postServiceLogin(correo:string, contrasena:string) {
  return this.http
  .post(environment.apiUlrl + "/api/empleados/login", JSON.stringify({correo, contrasena}),this.httpOptions).subscribe((resp:any) => {
      
    
    sessionStorage.setItem('currentUser',JSON.stringify(resp["empleado"][0]));
    this.router.navigate(['pedido/registrados']) .then(() => {
     window.location.reload();
     //this.router.ngOnDestroy;
  });
 
    
    //Aqui hay que checar que tipo de empleado es para poner su navbar y luego se cargará pedidos
    
 
  }, (errorResp)=>{
    this.toastr.error("Los datos ingresados son incorrectos, verificalos.","Error");  
    this.router.navigate(["/"]);

  });
 }

 //Funcion para checar la sesion
  getServiceLogin(): Observable<any>{
      return this.http
        .get(environment.apiUlrl + "/api/empleados/login")
        .pipe(retry(1), catchError(this.handleError));
    }



 handleError(error) {
  let errorMessage = "";
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Codigo de error: ${error.status}\n Mensaje: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
}

}