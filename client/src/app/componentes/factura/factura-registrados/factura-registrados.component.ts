import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms"; //Para validar los formularios

/*Servicios usados*/
import { ToastrService } from 'ngx-toastr'; //Para tener los mensaje de toast en pantalla
import { FacturaService } from 'src/app/servicios/factura.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PiezaService } from 'src/app/servicios/pieza.service';

//Modal service
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-factura-registrados',
  templateUrl: './factura-registrados.component.html',
  styleUrls: ['./factura-registrados.component.css']
})
export class FacturaRegistradosComponent implements OnInit {
  facturas: any = [];
  titulos: any[] = [{"name": "# factura"},{"name": "fecha"},{ "name": "# pedido"},
  {"name": "id empleado"}, {"name": "total"}];


   //Variables de la busqueda
   public idFactura:number;
   public idPedido:number;
   public idEmpleado:number;

   
   //Formulario de busqueda
   busquedaForm: FormGroup;

   //Variables modal factura
   detallepedidos:any = [];
   titulosdetalles: any[] = [{"name": "idPieza"},{ "name": "nombre"} ,{ "name": "imagen"},
   { "name": "cantidad"}];
   idPedidoaux:number;
   clientes: any = [];
   pedidos: any = [];
   idClienteaux: number;
   clienteaux: any;

   //Variables modal imagen
   srcaux:string;

  constructor(
    private facturaService: FacturaService,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private piezaService: PiezaService,
    private router: Router,
    private toastr:ToastrService,
    private builder: FormBuilder,
    private modalService: NgbModal

  ) { 
    this.busquedaForm = this.builder.group({
      idFactura: [null],
      idPedido: [null],
      idEmpleado: [null]
    });
  }

  ngOnInit(): void {
    this.cargarFacturas();
    this.cargarClientes();
    this.cargarPedidos();
  }

  cargarFacturas(){
    return this.facturaService.getFacturas().subscribe((resp: any) => {
      if(resp != null){
         this.facturas = resp["info"][0];         
      }
   }, (error:any)=>{
    this.toastr.error("Se produjo un error.","Error");  
    this.router.navigate(["navigation"]);});
  }

  busquedaFactura(){

    if(this.idFactura == undefined){
        this.idFactura = 0;
    }

    if(this.idPedido == undefined){
      this.idPedido = 0;
    }

    if(this.idEmpleado == undefined){
      this.idEmpleado = 0;
    }

    return this.facturaService.postBusquedaFactura(this.idFactura,this.idPedido, this.idEmpleado).subscribe((resp:any) => {
      this.facturas = resp["info"][0];
      
      
      this.toastr.info("Objeto encontrado.","Listo");  
       
  }, (error:any)=>{
    this.facturas = null;
    this.toastr.error("No se ha encontrado, verifica los datos","Error");  
  });
  }

  open(contenido, idPedido:number){
    
    let idP = idPedido;
    

   for (let i = 0; i < this.pedidos.length; i++) {
      
        if(this.pedidos[i].idPedido === idPedido){
          this.idClienteaux = this.pedidos[i].idCliente;    
          break;
        }
     
   }

    for (let j = 0; j < this.clientes.length; j++) {
      if(this.clientes[j].idCliente == this.idClienteaux){
        //  this.clientes[j] = this.clienteaux;
         this.clienteaux = this.clientes[j];
        
         break;
        }             
    }
   
    return this.pedidoService.postPedidoDetalles(idPedido).subscribe((resp:any) => {
      this.detallepedidos = resp["info"][0];
      this.modalService.open(contenido, {size: 'lg'}); 
      
       
  }, (error:any)=>{
    this.detallepedidos = null;
  });
   
  }

  cargarClientes(){

    return this.clienteService.getClientes().subscribe((resp: any) => {
      if(resp != null){
         this.clientes = resp["info"][0];         
      }
   }, (error:any)=>{
    this.toastr.error("Se produjo un error.","Error");  
    this.router.navigate(["navigation"]);});
  
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
