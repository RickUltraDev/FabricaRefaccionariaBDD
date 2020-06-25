import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Router } from "@angular/router"; //Para redireccionar a otra ruta si es que se necesita
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios

/*Servicios usados*/
import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla
import { AuthService } from "../../../servicios/auth.service";
import { PiezaService } from 'src/app/servicios/pieza.service';
import { ModelPieza } from 'src/app/modelos/ModeloPieza';


//Modal service
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-pieza-imagen',
  templateUrl: './pieza-imagen.component.html',
  styleUrls: ['./pieza-imagen.component.css']
})
export class PiezaImagenComponent implements OnInit {

  @ViewChild ('fileInput', {static: false}) fileInput: ElementRef;
  
  usuarioLog = {id: '',nombre: '',cargo: '',};
  piezas: any = [];
  titulos: any[] = [{"name": "id"},{ "name": "imagen"} ,{"name": "nombre"},{ "name": "categoria"},
  {"name": "precio fabr"},{"name": "precio venta"},{"name": "existencia"}];

   //Variables de la busqueda
  public nombre:string;
  public categoria:string;
  Categorias = ["Afinación", "Frenos","Suspensión","Clutch de Embrague","Enfriamiento","Ajuste de motor"];
  //Formulario de busqueda
  formval: FormGroup;
  buscBool: boolean = false;
   
  //Variables para cambio
  buttonModifica:boolean =  false;
  piezaaux:any;

   //Muestra imagen
   srcaux:string;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private piezaService: PiezaService,
    private authService: AuthService,
    private toastr:ToastrService,
    private modalService: NgbModal
  ) { 
    this.formval = this.builder.group({
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      categoria: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]]
    });


  }

  ngOnInit(): void {
    this.getUser();
    this.cargarPiezas();
  }

  getUser(){
    this.authService.getLogeado().subscribe((resp: any) => {
       if(resp != null){
        this.usuarioLog =  resp.info;
       }
    });
  } 

  cargarPiezas(){

    return this.piezaService.getPiezas().subscribe((resp: any) => {
      if(resp != null){
         this.piezas = resp["info"][0];         
      }
   }, (error:any)=>{
    this.toastr.error("Se produjo un error.","Error");  
    this.router.navigate(["navigation"]);});
  
  }
  
  busquedaPieza(){
    // [" ai - "Accesorios Internos", " ae - Accesorios Externos"," he Herramientas","lq Liquidos"];
    if(this.categoria == 'Accesorios Internos'){
      this.categoria = 'ai';
    }else if(this.categoria == 'Accesorios Externos'){
      this.categoria= 'ae'
    }else if(this.categoria == 'Herramientas'){
      this.categoria= 'he'
    }else if(this.categoria == 'Liquidos'){
      this.categoria= 'lq'
    }    
    

    return this.piezaService.postBusquedaPieza(this.nombre,this.categoria).subscribe((resp:any) => {
      this.piezas = resp["info"][0];
      this.toastr.info("Objeto encontrado.","Listo"); 
      this.buscBool = false; 
       
  }, (error:any)=>{
    this.piezas = null;
    this.toastr.error("No se ha encontrado, verifica los datos","Error");
    this.buscBool = true;  
  });
    
  }
  async postImagen(){
    
    //Declaración de variables
    const imageBlob = this.fileInput.nativeElement.files[0];
    const file = new FormData();
    //Set imagen a un tipo file
    file.set('file', imageBlob);
    
    
    this.piezaService.postImagenPieza(file, this.piezaaux.idPieza).subscribe(res =>{
       this.toastr.info("Imagen subida.","Listo"); 
       this.cargarPiezas();
      
    });


  }

   //Modal de mostrar imagen pieza
   mostrarImagen(contenido2, idPieza:number){
    this.piezaService.postBusquedaImagenPieza(idPieza).subscribe((resp:any) => {
        this.srcaux = resp["info"];
        
      this.modalService.open(contenido2, {size: 'lg'}); 
      
  }, (error:any)=>{
       this.srcaux = null
      });
  }



  toggleModficar(pieza: ModelPieza){    
    if(this.buttonModifica == true){
      this.buttonModifica = false;
     }else{
       this.buttonModifica = true;
     }

     this.piezaaux = pieza;     
    }

}
