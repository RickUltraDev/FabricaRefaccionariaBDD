const express = require('express');
const router = express.Router();
const sql = require("mssql/msnodesqlv8");

/* Conexión con BD*/
var dbpool = require('../database');

 //Regresa todas la pagos validos registrados
router.get("/api/pagos", async (req, res) => {
  var piezas = null;
  try {
    let QueryReal = "SELECT * FROM pago";
    dbpool.query(QueryReal, (err, resultados)=>{
      if(err){
          console.log(err);
          res.status(404).send({info: "Error"});
      }else{
          res.status(200).send({info: resultados.recordsets});              
      }
  })
  } catch (error) {
    console.log(error);
  } 
});

 //Regresa todas la pagos de credito validos registrados
 router.get("/api/pagos/credito", async (req, res) => {
  var piezas = null;
  try {
    let QueryReal = "SELECT * FROM pago WHERE tipo = 'cr'";
    dbpool.query(QueryReal, (err, resultados)=>{
      if(err){
          console.log(err);
          res.status(404).send({info: "Error"});
      }else{
          res.status(200).send({info: resultados.recordsets});              
      }
  })
  } catch (error) {
    console.log(error);
  } 
});

 //Regresa todas la pagos de contado validos registrados
 router.get("/api/pagos/contado", async (req, res) => {
  var piezas = null;
  try {
    let QueryReal = "SELECT * FROM pago WHERE tipo = 'co'";
    dbpool.query(QueryReal, (err, resultados)=>{
      if(err){
          console.log(err);
          res.status(404).send({info: "Error"});
      }else{
          res.status(200).send({info: resultados.recordsets});              
      }
  })
  } catch (error) {
    console.log(error);
  } 
});

//Registra una pago valido
router.post("/api/pagos/registro", async (req, res) => {
  let { tipo, fecha_pago, monto, total_llevado, idPedido } = req.body;
  const transaction = new sql.Transaction(dbpool)
  
  transaction.begin(err => {
       if(err){
        console.log("Error: "+err);
        throw err;
         //Failed
       }else{
      let rolledBack = false
   
      transaction.on('rollback', aborted => {
          // emited with aborted === true
          rolledBack = true
      })
      
      let QueryReal = null;
      
      console.log(tipo);
      

      if (tipo == 'cr'){
        QueryReal = "INSERT INTO pago (tipo, fecha_pago, monto, total_llevado, idPedido) VALUES "+
      "('"+tipo+"','"+fecha_pago+"',"+monto+","+total_llevado+","+idPedido+");";

      }else if(tipo == 'co'){
        QueryReal = "INSERT INTO pago (tipo, fecha_pago, idPedido) VALUES "+
      "('"+tipo+"','"+fecha_pago+"',"+idPedido+");";
      }

      new sql.Request(transaction).query(QueryReal, (err,datos) => {
          // insert should fail because of invalid value
          if (err) {
            console.log("Error: "+err);
              if (!rolledBack) {
                  transaction.rollback(err => {
                     if(err){
                      console.log("Error: "+err);
                      throw err;    
                      //Failed
                     }else{
                       res.status(400).send({info: "Registro no realizado"});
                     }
                  })
              }
          } else {
              transaction.commit(err => {
                if(err){
                  console.log("Error: "+err);
                  throw err;
                  //Failed
                 }else{
                  res.status(200).send({info: "Registro exitoso"});
                  //Success
                 } 
              })
          }//fin else
      })
    }})      
 
});  

//Actualizar los pagos a credito (PENDIENTE)
 router.post("/api/pagos/credito/actualiza/:idPedido", async (req, res) => {
    //id del cliente a eliminar
    const { idPedido } =  req.params;
    let {monto} = req.body;
    const transaction = new sql.Transaction(dbpool)
            
            transaction.begin(err => {
                 if(err){
                  console.log("Error: "+err);
                  throw err;
                   //Failed
                 }else{
                let rolledBack = false
             
                transaction.on('rollback', aborted => {
                    // emited with aborted === true
                    rolledBack = true
                })
                
                let QueryReal = "UPDATE pago SET monto = "+monto+" WHERE idPago = "+idPedido+
                "AND fecha_pago <= '1900-01-01';";
       
                new sql.Request(transaction).query(QueryReal, (err,datos) => {
                    // insert should fail because of invalid value
                    if (err) {
                     console.log("Error: "+err);
                        if (!rolledBack) {
                            transaction.rollback(err => {
                               if(err){
                                console.log("Error: "+err);
                                throw err;    
                                //Failed
                               }else{
                                 res.status(400).send({info: "Actualizacion no realizada"});
                               }
                            })
                        }
                    } else {
                        transaction.commit(err => {
                          if(err){
                            console.log("Error: "+err);
                            throw err;
                            //Failed
                           }else{
                            res.status(200).send({info: "Actualizacion exitosa"});
                            //Success
                           } 
                        })
                    }//fin else
                })
        }})   
});

//Regresa todos abonos hechos a un pedido 
router.get("/api/pagos/credito/abonos/:idPedido", async (req, res) => {
  
  const  {idPedido} = req.params;

  try {
    let QueryReal = "SELECT * FROM pago WHERE tipo = 'cr' AND idPedido = "+idPedido;
    dbpool.query(QueryReal, (err, resultados)=>{
      if(err){
          console.log(err);
          res.status(404).send({info: "Error"});
      }else{
          res.status(200).send({info: resultados.recordsets});              
      }
  })
  } catch (error) {
    console.log(error);
  } 
});




module.exports = router;