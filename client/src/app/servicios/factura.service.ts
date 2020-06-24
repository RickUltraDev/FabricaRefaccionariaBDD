import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";  //Ese es un servicio que hará httpRequests
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";  //Es el router de angular para redirigir a otras paginas

//Operaciones reactivas con el componente
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla
import { ModelFactura } from '../modelos/ModelFactura';


@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
  /* CRUD Methods for consuming RestAPI */
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  
//Post facturaPedido
postFacturaPedido(fecha:string, total:number, idPedido:number, idEmpleado:number){
  return this.http
  .post<ModelFactura>(environment.apiUlrl + "/facturas/registro", JSON.stringify({fecha, total, idPedido, idEmpleado}),this.httpOptions); 
}





}
