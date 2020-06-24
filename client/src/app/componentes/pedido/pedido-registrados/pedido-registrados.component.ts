import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios

/*Servicios usados*/
import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla
import { AuthService } from "src/app/servicios/auth.service";
import { PedidoService } from 'src/app/servicios/pedido.service';
import { PiezaService } from 'src/app/servicios/pieza.service';
import { FacturaService } from 'src/app/servicios/factura.service';


//Modal service
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-pedido-registrados',
  templateUrl: './pedido-registrados.component.html',
  styleUrls: ['./pedido-registrados.component.css']
})
export class PedidoRegistradosComponent implements OnInit {
  
  usuarioLog = {id: '',nombre: '',cargo: ''};
  pedidos: any = [];
  detallepedidos:any = [];

  titulos: any[] = [{"name": "# pedido"},{"name": "fecha y hora"},{ "name": "id Cliente"},
  { "name": "estatus de pago"},{"name": "estatus de surtido"}, {"name": "total"}];
  
  titulosdetalles: any[] = [{"name": "idPieza"},{ "name": "nombre"} ,{ "name": "imagen"},
  { "name": "cantidad"}];
  
    //Variables de la busqueda
    public idPedido:number;
    public estatus_surtido:string;
    public estatus_pago:string;
    public fecha:string
    TiposEnv = ["Surtido", "No Surtido"];
    TiposPag = ["Pagado", "No Pagado"];
    //Formulario de busqueda
    formval: FormGroup;
    //Muestra imagen
    srcaux:string;

    //Variables surtido de pedido
    idPedidoaux: number;
    totalaux: number;
    
    //Variables de surtido
    lenSurtido: number = 0;
    lenButton: number = 0;
    surtidoaux: string;


  constructor(
    private pedidoService: PedidoService,
    private authService: AuthService,
    private piezaService: PiezaService,
    private facturaService:FacturaService,
    private router: Router,
    private toastr:ToastrService,
    private builder: FormBuilder,
    private modalService: NgbModal
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

  //Modal de detalles 
  open(contenido, idPedido:number, total_pagar:number, surtido:string){
     
     this.idPedidoaux = idPedido;
     this.totalaux = total_pagar;
     this.surtidoaux = surtido;
    return this.pedidoService.postPedidoDetalles(idPedido).subscribe((resp:any) => {
      this.detallepedidos = resp["info"][0];
      this.modalService.open(contenido, {size: 'lg'}); 
      
      this.lenSurtido = this.detallepedidos.length;
      
       
  }, (error:any)=>{
    this.detallepedidos = null;
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


  //Sutir un pedido
  surtirPedido(idPedido:number,idPieza:number, cantidad: number){
    //Aumentar el pulsado del boton
    this.lenButton += 1;
    
    return this.pedidoService.postDetallePedido(idPedido, idPieza, cantidad).subscribe((resp:any) => {
      this.toastr.info("Se ha mandado surtido esta pieza.","Surtido");
       
  }, (error:any)=>{
    this.toastr.error("No se ha podido surtir, no hay existencia","Error");  
  });
      
  }

  generarfactura(){
    
    var fecha = new Date().toJSON().slice(0,10);    

    console.log(this.usuarioLog["idEmpleado"]);
    console.log(this.idPedidoaux);
    console.log(this.totalaux);

    return this.
    facturaService.postFacturaPedido(fecha, this.totalaux, this.idPedidoaux,this.usuarioLog["idEmpleado"]).subscribe((resp:any) => {
      this.toastr.success("Se ha generado una factura.","Excelente");
      //this.modalService.dismissAll;
      this.cargarPedidos();
       
  }, (error:any)=>{
    this.toastr.error("No se ha generado la factura, verifica los datos","Error");  
  });



  }


  

}
