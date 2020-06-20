import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";  //Ese es un servicio que hará httpRequests

import { environment } from '../../environments/environment'; //Es para regresa la ruta del servidor
import { Router } from "@angular/router";  //Es el router de angular para redirigir a otras paginas
import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient, private router: Router, private toastr: ToastrService ) { }
 
  //Cabeceras que manejará el servicio
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  //Funcion para iniciar sesion
  async login(correo:string, contrasena:string){
     return this.http
     .post<any>(environment.apiUlrl + "/empleados/login", JSON.stringify({correo, contrasena}),this.httpOptions).subscribe((resp:any) => {
        //Guardamos el token en la session del navegador
        sessionStorage.setItem('token', resp.token);
        this.toastr.success("Bienvenido","Sesion iniciada con éxito");  
        this.router.navigate(["empleado/registrados"]);
      
    }, (error:any)=>{
      this.toastr.error("Los datos ingresados son incorrectos, verificalos.","Error");  
      this.router.navigate(["/"]);
  
    });

  }

  //Funcion para ver si esta logeado el usuario
  logeado(){
    return !!sessionStorage.getItem('token'); 
  }
  
  //Esto es para saber si se tiene actualmente el token
  getToken(){
    return sessionStorage.getItem('token'); 
  }

  logout(){
    sessionStorage.removeItem('token');
    this.toastr.info("Nos vemos","Hasta luego");  
    this.router.navigate['/'];
  }



}
