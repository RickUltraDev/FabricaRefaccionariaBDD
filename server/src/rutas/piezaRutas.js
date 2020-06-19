const express = require('express');
const router = express.Router();
const sql = require("mssql/msnodesqlv8");

/* Conexión con BD*/
var dbpool = require('../database');

//Regresa todas la piezas validas registradas
router.get("/api/piezas", async (req, res) => {
  var piezas = null;
  try {
    let QueryReal = "SELECT * FROM pieza";
    dbpool.query(QueryReal, (err, resultados)=>{
      if(err){
          console.log(err);
          res.status(404).send({info: "Error"});
      }else{
          res.status(200).send({info: resultados.recordsets});
          //console.log(resultados.recordsets[0][0].idPieza);              
      }
  })
  } catch (error) {
    console.log(error);
  }
});
  

//Registra una piezas valida
router.post("/api/piezas/registro", async (req, res) => {
  let {nombre, descripcion, precio_fabricacion, precio_venta, existencia, categoria} = req.body;
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
      
      let QueryReal = "INSERT INTO pieza (nombre, descripcion, precio_fabricacion, precio_venta, existencia, categoria, valido) VALUES "+
      "('"+nombre+"','"+descripcion+"',"+precio_fabricacion+","+precio_venta+","+existencia+",'"+categoria+"',1);";
      
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

//Dar de baja lógica a una pieza
 router.delete("/api/piezas/elimina/:idPieza", async (req, res) => {
             //id a eliminar
  const { idPieza } =  req.params;
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

     let QueryReal = "UPDATE pieza SET valido = 0 WHERE idPieza = "+idPieza+";";

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

//Actualizar una pieza
router.put("/api/piezas/actualiza/:idPieza", async (req, res) => {
         //id a eliminar
         const { idPieza } =  req.params;
         let {nombre, descripcion, precio_fabricacion, precio_venta, existencia, categoria, valido} = req.body;
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
              
              let QueryReal = "UPDATE pieza SET nombre = '"+nombre+"', descripcion = '"+descripcion+"',"+ 
              "precio_fabricacion = '"+precio_fabricacion+"', precio_venta = '"+precio_venta+
              "', existencia = "+existencia+", categoria = '"+categoria+"', valido = "+valido+
              "  WHERE idPieza= "+idPieza+";";
     
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


//Actualizar existencia de una pieza
router.put("/api/piezas/actualiza/existencia/:idPieza", async (req, res) => {
  //id a eliminar
  const { idPieza } =  req.params;
  let {existencia} = req.body;
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
       
       let QueryReal = "UPDATE pieza SET existencia = "+existencia+ "WHERE idPieza= "+idPieza+";";

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

//Mostrar los atributos de una pieza especifica
router.get("/api/piezas/:idPieza", async (req, res) => {
  
  const { idPieza } = req.params;
   
  try {
    let QueryReal = "SELECT * FROM pieza WHERE idPieza = "+idPieza;
    dbpool.query(QueryReal, (err, resultados)=>{
      if(err){
          console.log(err);
          res.status(404).send({info: "Error"});
      }else{
          res.status(200).send({info: resultados.recordsets[0][0]});          
      }
  })
  } catch (error) {
    console.log(error);
  }
});
  

module.exports = router;