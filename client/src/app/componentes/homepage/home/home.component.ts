import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"; //Para redireccionar a otra ruta si es que se necesita
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios

//Servicios que usará la pagina
import { AuthService } from '../../../servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  //Parametros de inicio de sesion
  public correo:string;
  public contrasena:string;


  //Formulario a comprobar
  loginForm: FormGroup;
  
  //El constructor recibe el servicio y los validores del formulario

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { 
    this.loginForm = this.builder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
    
  }
   
  ngOnInit(){
  }
 

  //Funciones que hará nuestra pagina

  async postLogin(correo:string , contrasena:string){
    try {
      if (!this.loginForm.invalid) {
          this.authService.login(correo, contrasena);
          //Todos los subscribe van en el servicio
      }
    } catch (err) {
      console.log(err);
    }
  }
   
  

  

}
