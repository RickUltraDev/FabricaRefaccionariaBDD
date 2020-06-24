const express = require('express');
const router = express.Router();
const sql = require("mssql/msnodesqlv8");

/* Conexión con BD*/
var dbpool = require('../database');

 //Regresa todas la pagos validos registrados
router.get("/api/pagos", async (req, res) => {
  var piezas = null;
  try {
    let QueryReal = "SELECT * FROM [192.168.196.192].[fabricarefaccionaria].[dbo].[pago]";
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
    let QueryReal = "SELECT * FROM [192.168.196.192].[fabricarefaccionaria].[dbo].[pago] WHERE tipo = 'cr'";
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
    let QueryReal = "SELECT * FROM [192.168.196.192].[fabricarefaccionaria].[dbo].[pago] WHERE tipo = 'co'";
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
  
  console.log(req.body);
  
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
      
      
     //tipo, fecha_pago, monto, total_llevado, idPedido
        QueryReal = "INSERT INTO [192.168.196.192].[fabricarefaccionaria].[dbo].[pago] (tipo, fecha_pago, monto, total_llevado, idPedido) VALUES "+
      "('"+tipo+"','"+fecha_pago+"',"+monto+","+total_llevado+","+idPedido+");";

      

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
                   
                   let QueryReal2 = null;
                   
                   
                     if(tipo == 'Contado'){
                      QueryReal2 = "UPDATE [192.168.196.192].[fabricarefaccionaria].[dbo].[pedidofabrica] SET estatus_pago = 'S' where idPedido = "+idPedido+" ;";
                     }else if(tipo == 'Credito'){
                      QueryReal2 = "UPDATE [192.168.196.192].[fabricarefaccionaria].[dbo].[pedidofabrica] SET estatus_pago = 'N' where idPedido = "+idPedido+" ;"
                     }
                              
             
                   new sql.Request(transaction).query(QueryReal2, (err,datos) => {
                       // insert should fail because of invalid value
                       if (err) {
                         console.log("Error2: "+err);
                           if (!rolledBack) {
                               transaction.rollback(err => {
                                  if(err){
                                   console.log("Error34: "+err);
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
                
                let QueryReal = "UPDATE [192.168.196.192].[fabricarefaccionaria].[dbo].[pago] SET monto = "+monto+" WHERE idPago = "+idPedido+
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
    let QueryReal = "SELECT * FROM [192.168.196.192].[fabricarefaccionaria].[dbo].[pago] WHERE tipo = 'cr' AND idPedido = "+idPedido;
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

//Busqueda de una pieza
router.post("/api/pagos/busqueda",  (req, res) => {
  
  let {idPedido} = req.body;
  
   
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
            
      let QueryReal = "SELECT * FROM [192.168.196.192].[fabricarefaccionaria].[dbo].[pago] WHERE idPedido = "+idPedido+" ;";
      
      new sql.Request(transaction).query(QueryReal, (err,resultados) => {
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
                
                  if(resultados.recordsets[0] == 0){
                    res.status(404).send({info: null});
                    
                  }else{
                    res.status(200).send({info: resultados.recordsets});
                    console.log(resultados.recordsets);
                    
                    
                  }
                  
                  //Success
                 } 
              })
          }//fin else
      })
    }})

  
});





module.exports = router;