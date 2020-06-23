import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios

/*Servicios usados*/
import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla
import { AuthService } from "../../../servicios/auth.service";
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-pedido-registrados',
  templateUrl: './pedido-registrados.component.html',
  styleUrls: ['./pedido-registrados.component.css']
})
export class PedidoRegistradosComponent implements OnInit {
  usuarioLog = {id: '',nombre: '',cargo: '',};
  pedidos: any = [];
 
  titulos: any[] = [{"name": "# pedido"},{"name": "fecha y hora"},{ "name": "id Cliente"},
  { "name": "estatus de pago"},{"name": "estatus de envio"}];


    //Variables de la busqueda
    public idPedido:number;
    public estatus_surtido:string;
    public estatus_pago:string;
    public fecha:string
    

    TiposEnv = ["Surtido", "No Surtido"];
    TiposPag = ["Pagado", "No Pagado"];

    //Formulario de busqueda
    formval: FormGroup;

  constructor(
    private pedidoService: PedidoService,
    private authService: AuthService,
    private router: Router,
    private toastr:ToastrService,
    private builder: FormBuilder
  ) {
    this.formval = this.builder.group({
      idPedido: [null],
      estatus_surtido: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      estatus_pago: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      fecha: [null]
    });
   }

  ngOnInit(): void {
    this.getUser();
    this.cargarPedidos();
  }

  getUser(){
    this.authService.getLogeado().subscribe((resp: any) => {
       if(resp != null){
        this.usuarioLog =  resp.info;
       }
    });
  } 

  cargarPedidos(){
    return this.pedidoService.getPedidos().subscribe((resp: any) => {
      if(resp != null){
         this.pedidos = resp["info"][0];  
                
      }
    }, (error:any)=>{
    this.toastr.error("Se produjo un error.","Error");  
    this.router.navigate(["navigation"]);});
  
  }

  busquedaPedido(){
  
    if(this.idPedido == undefined){
        this.idPedido = 0;
    }

    if(this.estatus_surtido == "Surtido"){
      this.estatus_surtido = 's';
    }else if(this.estatus_surtido == "No Surtido"){
      this.estatus_surtido = 'n';
    }

    if(this.estatus_pago == "Pagado"){
      this.estatus_pago = 's';
    }else if(this.estatus_pago == "No Pagado"){
      this.estatus_pago = 'n';
    }


    return this.pedidoService.postBusquedaPedido(this.idPedido, this.estatus_surtido, this. estatus_pago,this.fecha).subscribe((resp:any) => {
      this.pedidos = resp["info"][0];
      this.toastr.info("Objeto encontrado.","Listo");  
       
  }, (error:any)=>{
    this.pedidos = null;
    this.toastr.error("No se ha encontrado, verifica los datos","Error");  
  });

  }





}
