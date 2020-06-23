import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";  //Ese es un servicio que hará httpRequests
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";  //Es el router de angular para redirigir a otras paginas

//Operaciones reactivas con el componente
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla
import { ModelPieza } from '../modelos/ModeloPieza';

@Injectable({
  providedIn: 'root'
})
export class PiezaService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
 /* CRUD Methods for consuming RestAPI */
 httpOptions = {
   headers: new HttpHeaders({
     "Content-Type": "application/json"
   })
 };


 postRegistroPieza(modelPieza: ModelPieza) {

  return this.http
    .post<ModelPieza>(environment.apiUlrl + "/piezas/registro", JSON.stringify(modelPieza),this.httpOptions).subscribe((resp: {}) => {
      this.toastr.success("Registro exitoso ","Mostrando nueva pieza");  
      this.router.navigate(["navigation/pieza/registrados"]);
    }, (error:any)=>{
      this.toastr.error("Los datos ingresados son incorrectos, verificalos.","Error");  
    });
}

  //Obtenter todas las piezas
getPiezas(): Observable<ModelPieza> {
    return this.http
      .get<ModelPieza>(environment.apiUlrl + "/piezas").pipe(retry(1), catchError(this.handleError));
  }

   //Eliminación pieza
 deletePieza(idPieza){
  return this.http
    .delete<ModelPieza>(environment.apiUlrl + "/piezas/elimina/"+ idPieza).pipe(retry(1), catchError(this.handleError));
}
  
  //Obtenen la pieza buscada
postBusquedaPieza(nombre:string, categoria:string){

  return this.http
  .post<any>(environment.apiUlrl + "/piezas/busqueda", JSON.stringify({nombre,categoria}),this.httpOptions); 
}
 
//Ruta para subir imagenes
postImagenPieza(file: FormData, idPieza:number){
  return this.http
  .post<any>(environment.apiUlrl + "/piezas/subir/"+idPieza, file);
  
}

 //Cambios de un empleado
 putPiezaActualiza(pieza){
  return this.http.put<ModelPieza>(environment.apiUlrl+ "/piezas/actualiza/"+pieza.idPieza,pieza);

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
