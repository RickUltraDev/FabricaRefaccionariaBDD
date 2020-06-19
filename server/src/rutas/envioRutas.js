const express = require('express');
const router = express.Router();
const sql = require("mssql/msnodesqlv8");

/* Conexión con BD*/
var dbpool = require('../database');

 
//Regresa todas los envios registrados
router.get("/api/envios", async (req, res) => {
  var envios = null;
  try {
    let QueryReal = "SELECT * FROM envio";
    dbpool.query(QueryReal, (err, resultados)=>{
      if(err){
          console.log(err);
          res.status(404).send({info: "Error"});
      }else{
          res.status(200).send({info: resultados.recordsets});
          //console.log(resultados.recordsets[0][0].idEnvio);              
      }
  })
  } catch (error) {
    console.log(error);
  }
});
  

//Registra un envio valido
router.post("/api/envios/registro", async (req, res) => {
  let { monto_envio, fecha_entrega, estatus, idPedido} = req.body;
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
     
     let QueryReal = "INSERT INTO envio ( monto_envio, fecha_entrega, estatus, idPedido, valido) VALUES "+
     "("+monto_envio+",'"+fecha_entrega+"','e',"+idPedido+", 1);";
     
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


//Dar de baja un envio
 router.delete("/api/envios/elimina/:idEnvio", async (req, res) => {
         
           //id a eliminar
  const { idEnvio } =  req.params;
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

     let QueryReal = "UPDATE envio SET valido = 0 WHERE idEnvio = "+idEnvio+";";

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


//Actualizar un envio en cualquier atributo
router.put("/api/envios/actualiza/:idEnvio", async (req, res) => {
          //id a eliminar
          const { idEnvio} =  req.params;
          let { monto_envio, fecha_entrega, estatus, idPedido, valido} = req.body;
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
               
               let QueryReal = "UPDATE envio SET monto_envio = '"+monto_envio+"', fecha_entrega = '"+fecha_entrega+"',"+ 
               "estatus = '"+estatus+"', idPedido = '"+idPedido+"', valido = "+valido+" WHERE idEnvio= "+idEnvio+";";
      
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

//Actualizar un envio a terminado
router.put("/api/envios/terminado/:idEnvio", async (req, res) => {
  //id a eliminar
  const {idEnvio} =  req.params;
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
       
       let QueryReal = "UPDATE envio SET estatus = 't' WHERE idEnvio= "+idEnvio+";";

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



module.exports = router;