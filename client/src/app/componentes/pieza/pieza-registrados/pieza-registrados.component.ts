import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios

/*Servicios usados*/
import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla
import { AuthService } from "../../../servicios/auth.service";
import { PiezaService } from 'src/app/servicios/pieza.service';

//Modal service
import {NgbModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-pieza-registrados',
  templateUrl: './pieza-registrados.component.html',
  styleUrls: ['./pieza-registrados.component.css']
})
export class PiezaRegistradosComponent implements OnInit {
  
  usuarioLog = {id: '',nombre: '',cargo: '',};
  piezas: any = [];
  titulos: any[] = [{"name": "id"},{ "name": "imagen"} ,{"name": "nombre"},{ "name": "categoria"},
  {"name": "precio fabr"},{"name": "precio venta"},{"name": "existencia"}];

   //Variables de la busqueda
  public nombre:string;
  public categoria:string;
  Categorias = ["Accesorios Internos", "Accesorios Externos","Herramientas","Liquidos"];
  //Formulario de busqueda
  formval: FormGroup;

   //Muestra imagen
   srcaux:string;

  constructor(
    private piezaService:PiezaService,
    private authService: AuthService,
    private router: Router,
    private toastr:ToastrService,
    private builder: FormBuilder,
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


  eliminarPieza(idPieza){
    return this.piezaService.deletePieza(idPieza).subscribe((resp: {}) => {
      this.toastr.info("Eliminación exitosa.","Listo");  
        this.cargarPiezas();
        
     });   
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
       
  }, (error:any)=>{
    this.piezas = null;
    this.toastr.error("No se ha encontrado, verifica los datos","Error");  
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

  


}
