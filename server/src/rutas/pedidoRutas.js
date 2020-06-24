const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); //Modulo de token
const sql = require("mssql/msnodesqlv8");

/* Conexión con BD*/
var dbpool = require('../database');

//Función para verificación del token creado en login.
function verifyToken(req, res, next){
  if(!req.headers.authorization){
    return res.status(401).send({
      token: null
    });
  }

  const token = req.headers.authorization.split(' ')[1];
    if (token == 'null'){
       //No autorizado para seguir
      return res.status(401).send({
        token: null
      });
    }

    //Aqui se verifica el token y se saca la información que tiene (payload)
    const payload = jwt.verify(token, 'secretkey')
    req.userId = payload.id;
    
    next();
    
}


//Regresa todas la pedidos validas registradas
//Ejemplo protegido con token: router.get("/api/pedidos", verifyToken, async (req, res) => {
router.get("/api/pedidos", async (req, res) => {
  try {
    let QueryReal = "SELECT * FROM pedidofabrica";
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

//busca los detalles del pedido
router.post("/api/detallepedidos/busqueda", async (req, res) => {
  let { idPedido } = req.body;
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
      
    
  
      let QueryReal = "SELECT d.idPedido, p.idPieza, p.nombre, p.url, d.cantidad FROM detallepedidopieza d "+
      "INNER JOIN pieza p ON d.idPieza = p.idPieza WHERE idPedido = "+idPedido+" ; ";

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
                       res.status(400).send({info: null});
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
                  res.status(200).send({info: resultados.recordsets});
                  //Success
                 } 
              })
          }//fin else
      })
    }})      
});
  
//Registra un pedido valido
router.post("/api/pedidos/registro", async (req, res) => {
  let { fecha, total_pagar,estatus_surtido, estatus_pago, idCliente } = req.body;
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
      
    
  
      let QueryReal = "INSERT INTO pedidofabrica (fecha, total_pagar ,estatus_surtido, estatus_pago, idCliente) VALUES "+
        " ('"+fecha+"',"+total_pagar+",'"+estatus_surtido+"','"+estatus_pago+"',"+idCliente+"); ";

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

//Surtir pedido
router.post("/api/pedidos/surtir", async (req, res) => {
  let { idPedido , idPieza, cantidad} = req.body;
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
  
  let QueryReal2 = "UPDATE pieza SET existencia = existencia - "+cantidad+" "+ 
  " FROM pieza p INNER JOIN detallepedidopieza d ON d.idPieza = p.idPieza "+
  " WHERE existencia >= "+cantidad+" and p.idPieza = "+idPieza+" ;"

  new sql.Request(transaction).query(QueryReal2, (err,datos) => {
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



//Registra los detalles del pedido valido
router.post("/api/detallepedidos/registro", async (req, res) => {
  let { idPedido , idPieza, cantidad} = req.body;
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

      let QueryReal = "INSERT INTO detallepedidopieza (idPedido , idPieza, cantidad) VALUES "+
        " ("+idPedido+","+idPieza+","+cantidad+"); ";

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
                      // success
                      res.status(200).send({info: "Registro exitoso"});
                  //Success
                 } 
              })
          }//fin else
      })
    }})      
});


//Dar de baja una pedido
router.delete("/api/pedidos/elimina/:idPedido", async (req, res) => {
     //id a eliminar
     const { idPedido } =  req.params;
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
   
        let QueryReal = "DELETE pedidofabrica WHERE idPedido = "+idPedido+";";
   
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
                          res.status(400).send({info: "Eliminacion no realizada"});
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
                     res.status(200).send({info: "Eliminacion exitosa"});
                     //Success
                    } 
                 })
             }//fin else
         })
       }})  

});

//Actualiza una pedido
router.put("/api/pedidos/actualiza/:idPedido", async (req, res) => {
  const { idPedido } =  req.params;
  let {fecha, total_pagar, estatus_surtido, estatus_pago, idCliente} = req.body;
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
       
       let QueryReal = " UPDATE pedidofabrica SET fecha = '"+fecha+"', total_pagar = "+total_pagar+","+
       "estatus_surtido = '"+estatus_surtido+"', estatus_pago = '"+estatus_pago+"', idCliente = "+idCliente+""+
       "WHERE idPedido = "+idPedido+";";

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

//Regresa los pedidos que aun no se han surtido
router.get("/api/pedidos/surtidos", async (req, res) => {
  try {
    let QueryReal = "SELECT * FROM pedidofabrica WHERE estatus_surtido = 'n';";
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

//Regresa el gasto promedio de pedidos
router.get("/api/pedidos/gasto", async (req, res) => {
  try {
    let QueryReal = "SELECT Cast(Round(sum(total_pagar)/count(*),2,1) as decimal(18,2)) FROM pedidofabrica;";
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


//Busqueda 
router.post("/api/pedidos/busqueda",  (req, res) => {
  let {idPedido, estatus_surtido, estatus_pago,fecha} = req.body;

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
      });
      
      console.log(fecha);
      

      let QueryReal = "SELECT * FROM pedidofabrica "+
      " WHERE CONVERT(VARCHAR(25), fecha, 126) LIKE '"+fecha+"%' OR estatus_surtido LIKE '"+estatus_surtido+
      "' AND estatus_pago LIKE '"+estatus_pago+"' OR idPedido = "+idPedido+";";
      
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
                    
                  }
                  
                  //Success
                 } 
              })
          }//fin else
      })
    }})

  
});




module.exports = router;