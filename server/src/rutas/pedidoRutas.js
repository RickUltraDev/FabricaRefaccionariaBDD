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
  
//Registra un pedido valido (PENDIENTE)
router.post("/api/pedidos/registro", async (req, res) => {
      dbpool.getConnection(function (err, connection) {

          
        /* Begin transaction */
        connection.beginTransaction(function (err) {
          if (err) {
            console.log("Error " + err);  
            connection.rollback(function() {
                connection.release();
                //Failure
            });
          }else{

          connection.query("INSERT INTO pedidofabrica set ?", [req.body], function (err, result) {
              if (err) {
                console.log("Error " + err);
                connection.rollback(function() {
                    connection.release();
                    //Failure
                });
              }
             
                   
              connection.commit(function (err) {
                if (err) {
                    console.log("Error " + err);
                    connection.rollback(function() {
                        connection.release();
                        //Failure
                    });
                }else{
                    
                    connection.release();
                    res.json({ message: "Registro creado" });
                    //Success
                }

              });

            }); //fin query
          }

        });//fin conexión

      });
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

//Regresa los pedidos que aun no se han surtido
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





module.exports = router;