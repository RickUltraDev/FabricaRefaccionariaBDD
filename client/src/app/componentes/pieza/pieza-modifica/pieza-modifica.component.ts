import { Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios

/*Servicios usados*/
import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla
import { AuthService } from "../../../servicios/auth.service";
import { PiezaService } from 'src/app/servicios/pieza.service';
import { ModelPieza } from 'src/app/modelos/ModeloPieza';


//Modal service
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-pieza-modifica',
  templateUrl: './pieza-modifica.component.html',
  styleUrls: ['./pieza-modifica.component.css']
})
export class PiezaModificaComponent implements OnInit {
 
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
   empleadoaux:any;
   piezaaux:any

  public Pieza: ModelPieza;
  formval2: FormGroup;

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

    this.formval2 = this.builder.group({
      nombre: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(60)]],
      descripcion: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(80)]],
      precio_fabricacion: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(6)]],
      precio_venta: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(6)]],
      existencia: ["", [Validators.required,Validators.minLength(1), Validators.maxLength(9)]],
      categoria: [null, Validators.required],
      valido:[null],
      url:[null]
    });
    this.Pieza = new ModelPieza();
    this.formval2.setValue(this.Pieza);
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
 

  toggleModficar(pieza: ModelPieza){    
    if(this.buttonModifica == true){
      this.buttonModifica = false;
     }else{
       this.buttonModifica = true;
     }

     this. piezaaux = pieza;
    }
   
    async postEmpleadoModifica(){
      try {
        if (!this.formval2.invalid) {
          
          if(this.piezaaux.categoria == 'Accesorios Internos'){
            this.piezaaux.categoria = 'ai';
           }
    
           if(this.piezaaux.categoria == 'Accesorios Externos'){
            this.piezaaux.categoria = 'ae';
           }
    
           if(this.piezaaux.categoria == 'Herramientas'){
            this.piezaaux.categoria = 'he';
           }
    
           if(this.piezaaux.categoria == 'Liquidos'){
            this.piezaaux.categoria = 'lq';
           }
              
           console.log(this.piezaaux);
           
          await this.piezaService.putPiezaActualiza(this.piezaaux).subscribe((resp:any) => {
            this.toastr.info("Empleado actualizado.","Listo");
            this.router.navigate(["navigation/pieza/registrados"]);  
             
        }, (error:any)=>{
          this.toastr.error("No actualizado, verifica los datos","Error");  
        });
  
        }
      } catch (err) {
        console.log(err);
      }
        
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
